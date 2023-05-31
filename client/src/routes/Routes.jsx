import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from "./ProtectedRoute";
import Basket from "../components/Main/Basket/Basket";
import Bookstore from "../pages/BookStore/Bookstore";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import { useSelector } from "react-redux";


export default function MainRoutes() {

  
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute/>} >
        <Route path="bookstore"  element={<Bookstore/>}/>
        <Route path="basket" element={<Basket />} />
        <Route path="profile" element={<Profile/>}/>
      </Route>
      <Route path="*" element={<h1>404</h1>}/>
    </Routes>
  );
}
