import React from "react";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../../redux/features/book-slice";
import { useNavigate } from "react-router-dom";
import { addBookToCart } from "../../../../redux/features/cart-slice";
import { BookImg, BookInfo, BookPrice, StyledBook } from "./Book.style";

function Book({ book }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <StyledBook
      onClick={() => {
        dispatch(bookActions.setSelected(book));
        navigate(`/bookstore/?${book._id}`);
      }}
    >
      <BookImg src={book.bookImg}></BookImg>
      <BookInfo>
        <h1>{book.title}</h1>
        <span>{book.author.name}</span>
        <span>{book.publisher}</span>
        <span>{book.format}</span>
        <BookPrice
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addBookToCart(book));
          }}
        >
          <p>{book.price.toString().concat(" ₺")}</p>
          <span>Sepete Ekle</span>
        </BookPrice>
      </BookInfo>
    </StyledBook>
  );
}

export default Book;
