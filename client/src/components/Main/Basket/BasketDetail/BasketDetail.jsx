import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, elGR } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  buyBooks,
  getBooksInCart,
  removeBookFromCart,
} from "../../../../redux/features/cart-slice";
import { Button } from "@mui/material";
import { BasketSummary } from "./BasketDetail.style";

function BasketDetail() {
  const dispatch = useDispatch();

  const booksInCart = useSelector((state) => state.cart.cartItems);

  const [selectedRows, setSelectedRows] = useState([]);

  let totalPrice = 0;

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  function getMonthName(month) {
    const monthNames = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    return monthNames[month - 1];
  }

  const columns = [
    { field: "ISBN", headerName: "ISBN", width: 200 },
    {
      field: "bookImg",
      headerName: "ÜRÜN",
      width: 200,
      renderCell: (params) => <BookImageCell value={params.value} />,
    },
    {
      field: "title",
      headerName: "ÜRÜN ADI",
      width: 250,
      renderCell: (params) => (
        <div>
          <b>{params.value}</b>
          <br />
          <br />
          <span style={{ fontSize: "15px" }}>{params.row.category}</span>
          <br />
          <span style={{ fontSize: "14px" }}>{params.row.author.name}</span>
          <br />
          <span style={{ fontSize: "14px" }}>{params.row.format}</span>
          <br />
          <span style={{ fontSize: "15px", color: "green" }}>
            Tahmini Teslimat: <br />
            {day + 2} {getMonthName(month)}
          </span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "FİYAT",
      width: 200,
      renderCell: (params) => <BookPriceCell value={params.value} />,
    },
  ];

  function BookImageCell(props) {
    return <img src={props.value} alt="book" style={{ height: "190px" }} />;
  }

  function BookPriceCell(props) {
    return <h3>{props.value} TL</h3>;
  }

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  booksInCart.forEach((el) => {
    totalPrice += el.price;
  });

  const getRowId = (row) => {
    return row._id;
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ height: "600px", width: "70%" }}>
          <DataGrid
            rows={booksInCart}
            rowHeight={250}
            sx={{ fontSize: "18px" }}
            columns={columns}
            getRowId={getRowId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionModelChange}
          />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{ height: 80, fontSize: 20 }}
              onClick={() => {
                dispatch(removeBookFromCart(selectedRows));
                dispatch(getBooksInCart());
              }}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Seçili olanları kaldır
            </Button>
          </div>
        </div>
        <BasketSummary>
          <h1 style={{ color: "#444444", fontSize: "1.6em" }}>Sipariş Özeti</h1>
          <span style={{ color: "#9b9b9b", fontSize: "1em" }}>
            {booksInCart.length} ürün
          </span>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#444444", fontSize: "23px" }}>
              Ödenecek Tutar
            </span>
            <span
              style={{
                color: "#e7030a",
                fontSize: "23px",
                fontWeight: "bolder",
              }}
            >
              {totalPrice}TL
            </span>
          </div>
          <br />
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              style={{
                height: 80,
                width: 500,
                fontSize: 25,
                border: "1px solid #000",
                backgroundColor: booksInCart.length == 0 ? "gray" : "red",
                color: booksInCart.length == 0 ? "#000" : "#fff",
              }}
              variant={booksInCart.length == 0 ? "disabled" : "outlined"}
              onClick={() => {
                dispatch(buyBooks(totalPrice));
                setTimeout(() => {
                  window.location = "/basket";
                }, 2000);
              }}
            >
              Satın al
            </Button>
          </div>
        </BasketSummary>
      </div>
      {/* {booksInCart.map((book) => (
        <Book>
          <BookInfo>
            <img src={book.bookImg} width={150}/>
            <BookDetail>
              <b>{book.title}</b>
              <span>{book.author.name}</span>
              <span>{book.format}</span>
            </BookDetail>
          </BookInfo>
          <div>
            <p>{book.price}</p>
          </div>
        </Book>
      ))} */}
    </>
  );
}
export default BasketDetail;
