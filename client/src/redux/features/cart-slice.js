import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../utilities/fetch.js";

const _id = JSON.parse(localStorage.getItem("_id"));

export const addBookToCart = createAsyncThunk(
  "cart/addBookToCart",
  async (book) => {
    await service.post("http://localhost:8001/addItemToCart", {
      _id,
      book,
    });
  }
);

export const getBooksInCart = createAsyncThunk(
  "cart/getBooksInCart",
  async () => {
    const bookData = await service.post(
      "http://localhost:8001/getBooksInCart",
      {
        _id,
      }
    );

    return bookData;
  }
);

export const removeBookFromCart = createAsyncThunk(
  "cart/removeBookFromCart",
  async (books) => {
    const bookData = await service.post(
      "http://localhost:8001/removeBookFromCart",
      {
        _id,
        books,
      }
    );
    return bookData.data;
  }
);

export const getUserBalance = createAsyncThunk(
  "currentUser/getUserBalance",
  async () => {
    const balance = await service.post("/getUserBalance", {_id});
    return balance;
  }
);

export const buyBooks = createAsyncThunk(
  "currentUser/buyBooks",
  async (totalPrice) => {
    balance = await service.post("/buyBooks", { _id, totalPrice });
    return balance;
  }
);

const initialState = {
  cart: false,
  isLoading: false,
  balance: 0,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [getBooksInCart.pending]: (state) => {
      state.isLoading = true;
    },
    [getBooksInCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getBooksInCart.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeBookFromCart.pending]: (state) => {
      state.isLoading = true;
    },
    [removeBookFromCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [removeBookFromCart.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUserBalance.fulfilled]: (state, action) => {
      state.balance = action.payload;
    },
    [buyBooks.pending]: (state) => {
      state.balance = state.balance;
    },
    [buyBooks.fulfilled]: (state, action) => {
      state.balance = action.payload;
      state.cartItems = [];
    },
    [buyBooks.rejected]: (state) => {
      state.balance = state.balance;
    },
  },
});

// export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
