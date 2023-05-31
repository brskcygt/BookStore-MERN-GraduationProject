import { Button, Container, Grid, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../redux/features/book-slice";
import { StyledBox } from "./BookCategories.style";

function BookCategories() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("Bütün Kitaplar");
  const pages = [
    "Bütün Kitaplar",
    "Roman",
    "Bilim Kurgu",
    "Gerilim",
    "Denemeler",
    "Öykü",
    "Polisiye",
    "Şiir",
  ];

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <StyledBox>
          <div style={{ display: "flex" }}>
            {pages.map((page, idx) => (
              <Grid item key={idx}>
                <Button
                  key={idx}
                  variant="outlined"
                  size="large"
                  underline="none"
                  style={{
                    marginRight: "20px",
                    cursor: "pointer",
                    backgroundColor: page === currentPage ? "#000" : "initial",
                    color: page === currentPage ? "white" : "initial",
                    border: "1px solid #000",
                  }}
                  onClick={() => {
                    dispatch(
                      bookActions.setKeyword(
                        page == "Bütün Kitaplar" ? "" : page
                      )
                    );
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </Button>
              </Grid>
            ))}
          </div>
        </StyledBox>
      </Toolbar>
    </Container>
  );
}

export default BookCategories;
