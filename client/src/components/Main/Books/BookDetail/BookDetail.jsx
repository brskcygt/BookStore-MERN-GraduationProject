import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../../redux/features/book-slice";
import { useNavigate } from "react-router-dom";
import { BookInfo, MoreDetail, Subject } from "./BookDetail.style";
import { addBookToCart } from "../../../../redux/features/cart-slice";

function BookDetail({ book }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            dispatch(bookActions.setSelected());
            navigate(`/bookstore`);
          }}
        >
          Geri Dön
        </Button>
      </Container>

      <Container sx={{ display: "flex", margin: 5 }}>
        <Box>
          <img src={book.bookImg} width={330} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <BookInfo>
            <h1>{book.title}</h1>
            <h3>{book.publisher}</h3>
            <h3 style={{ color: "red" }}>{book.author.name}</h3>
          </BookInfo>
          <MoreDetail>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "30px",
              }}
            >
              <span>
                <b>Türü:</b> {book.category}
              </span>
              <span>
                <b>ISBN:</b> {book.ISBN}
              </span>
              <span>
                <b>Dil: </b>
                {book.language}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                <b>Sayfa Sayısı</b> : {book.numberOfPages}
              </span>
              <span>
                <b>Kapak</b>: {book.format}
              </span>
              <span>
                <b>Basım Tarihi</b> : {book.publicationDate}
              </span>
            </div>
          </MoreDetail>
          <Button
            onClick={() => dispatch(addBookToCart(book))}
            variant="contained"
            size="large"
            sx={{ marginTop: "-20px", fontSize: "16px", marginLeft: "10px" }}
          >
            {book.price} TL
          </Button>
        </Box>
      </Container>

      <Container>
        <Subject>
          <h1>Kitap Hakkında</h1>
          <p>{book.subject}</p>
        </Subject>
      </Container>
    </>
  );
}

export default BookDetail;
