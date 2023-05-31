import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../utilities/fetch";

const _id = JSON.parse(localStorage.getItem("_id"));

export const loginAction = createAsyncThunk("auth/login", async (user) => {
  const userData = await service.post("/login", user);
  localStorage.setItem("_id", JSON.stringify(userData.user._id));
  window.location = "/bookstore";
});

export const registerAction = createAsyncThunk(
  "auth/register",
  async (user) => {
    await service.post("/register", user);
    window.location = "/login";
  }
);

export const logOutAction = () => {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("_id");
    window.location = "/login";
  };
};

export const getLoggedUser = createAsyncThunk("auth/currentUser", async () => {
  const data = await service.post("/getLoggedUser", { _id });
  return data;
});

export const updateUser = createAsyncThunk("auth/updateUser", async (user) => {
  await service.post("/updateUserInfo", { _id, user });
});

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  isLoading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [loginAction.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAction.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [loginAction.rejected]: (state) => {
      state.currentUser = {};
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = true;
    },
    [registerAction.pending]: (state) => {
      state.isLoading = true;
    },
    [registerAction.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [registerAction.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [getLoggedUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getLoggedUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    [getLoggedUser.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state) => {
      state.isLoading = false;
      window.location = "/profile"
    },
    [updateUser.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
