import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../utilities/fetch.js";

const initialState = {
  allBooks: [],
  selected: null,
  searchKeyword: "",
  cart: false,
  isLoading: false,
};

export const getAllBooks = createAsyncThunk("books/getAllBooks", async () => {
  const bookData = await service.get("/books");
  return bookData;
});

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
    setKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    setCart(state) {
      state.cart = !state.cart;
    },
  },
  extraReducers: {
    [getAllBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allBooks = action.payload;
    },
    [getAllBooks.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
