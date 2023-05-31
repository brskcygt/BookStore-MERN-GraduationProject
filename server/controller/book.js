import Book from '../database/models/book.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {

    const { 
        ISBN, 
        title,
        category,
        author, 
        subject,
        summary,
        publisher, 
        language, 
        numberOfPages,
        bookImg,
        price,
        format,
        publicationDate
    } = req.body;
    
    const {name,description} = author;
    console.log(req.body);
    console.log(req.body.author)

    try {
        const book = await Book.create({
            ISBN,
            title,
            category,
            author:{
                name,
                description
            },
            subject,
            summary,
            publisher,
            language,
            numberOfPages,
            bookImg,
            price,
            format,
            publicationDate
        });

        res.status(201).json({
            status:"OK",
            book
        })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getBook = async (req,res) => {

    const {ISBN} = req.body;

    try {
        const book = await Book.findOne({ISBN});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteBook = async (req,res) => {
    try {
        const {id} = req.params;
        await Book.findByIdAndRemove(id);
        res.status(200).json({message:"Başarılı"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}