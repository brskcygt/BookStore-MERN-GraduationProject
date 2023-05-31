import Account from "../database/models/account.js";
import Book from "../database/models/book.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await Account.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLoggedUser = async (req, res) => {
  const { _id } = req.body;

  const user = await Account.findOne({ _id });

  if (!user) {
    return res
      .status(500)
      .json({ message: "Kullanıcı bulunamadı" });
  }

  return res.status(200).json(user.person);
};

export const register = async (req, res) => {
  try {
    const { username, password, person } = req.body;
    const { firstName, lastName, email, phone } = person;

    const user = await Account.findOne({ "person.email": email });

    if (user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı zaten mevcut." });
    }

    if (password.length < 8) {
      return res
        .status(500)
        .json({ message: "Şifreniz 8 karakterden küçük olamaz." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)) {
      return res.status(500).json({ message: "Email formatında değil." });
    }

    const newUser = await Account.create({
      username,
      password: passwordHash,
      person: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ "person.email": email });

    if (!user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ message: "Şifre yanlış" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lorem" });
  }
};

export const updateUserInfo = async (req, res) => {
  const { _id } = req.body;
  const { email, firstName, lastName, phone } = req.body.user;

  const user = await Account.findOne({ _id });

  if (!user) {
    return res.status(500).json({ message: "Böyle bir kullanıcı bulunamadı" });
  }

  await Account.findOneAndUpdate(
    { _id },
    {
      $set: {
        person: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        },
      },
    }
  );

  return res.status(200).json({ message: "Başarılı" });
};

export const getBooksInCart = async (req, res) => {
  const { _id } = req.body;

  const user = await Account.findOne({ _id });

  res.status(200).json(user.books);
};

export const addBookToCart = async (req, res) => {
  const { _id, book } = req.body;

  const user = await Account.findOne({ _id });

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı." });
  }

  const bookData = await Book.findOne({ title: book.title });

  if (!bookData) {
    return res.status(404).json({ message: "Kitap bulunamadı." });
  }
  let bookIndex = user.books.findIndex((el) => el.title == bookData.title);
  if (bookIndex !== -1) {
    return res.status(500).json({
      message:
        "Kitap sepette zaten mevcut sipariş sayısını artırmak için sepete gidiniz.",
    });
  }

  await Account.findOneAndUpdate({ _id }, { $push: { books: book } });
  return res.status(200).json({ message: "Sepete kitap ekleme başarılı!" });
};

export const removeBookFromCart = async (req, res) => {
  const { _id, books } = req.body;

  const user = await Account.findOne({ _id });

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı." });
  }

  if (books.length === 0) {
    return res
      .status(500)
      .json({ message: "Lütfen silmek istediğiniz kitabı seçiniz." });
  }

  user.books = user.books.filter((item) => !books.includes(item._id));

  await Account.findOneAndUpdate({ _id }, { $set: { books: user.books } });

  return res
    .status(200)
    .json({ data: user.books, message: "Sepetten kitap silme başarılı!" });
};

export const getUserBalance = async (req, res) => {
  const { _id } = req.body;

  const user = await Account.findOne({ _id });

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı." });
  }

  return res.status(200).json(user.balance);
};

export const buyBooks = async (req, res) => {
  const { _id, totalPrice } = req.body;

  const user = await Account.findOne({_id});

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı." });
  }

  if (user.balance < totalPrice) {
    return res.status(500).json({ message: "Yetersiz bakiye!" });
  }

  user.books = [];

  await Account.findOneAndUpdate(
    { _id },
    { $set: { balance: user.balance - totalPrice, books: user.books } }
  );

  return res
    .status(200)
    .json({ data: user.balance, message: "Satın alma işlemi başarılı!" });
};

const isEmail = (email) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regex)) {
    return true;
  }
  return false;
};
