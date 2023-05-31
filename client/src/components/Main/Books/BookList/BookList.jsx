import React, { useEffect } from "react";
import Book from "../Book/Book";
import { useSelector } from "react-redux";
import { StyledBookList } from "./BookList.style";

function BookList() {
  const allBooks = useSelector((state) => state.books.allBooks);
  const keyword = useSelector((state) => state.books.searchKeyword);

  const filteredBooks = allBooks.filter((el) => {
    const authorName = el.author.name.toLowerCase();
    const categoryName = el.category.toLowerCase();
    const ISBN = el.ISBN;
    const keywordLower = keyword.toLowerCase();
    return (
      authorName.includes(keywordLower) ||
      categoryName.includes(keywordLower) ||
      ISBN == keyword.toString()
    );
  });

  return (
    <StyledBookList>
      {filteredBooks.map((book) => (
        <Book key={book._id} book={book} />
      ))}
    </StyledBookList>
  );
}

export default BookList;
