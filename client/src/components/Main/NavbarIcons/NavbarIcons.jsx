import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBooksInCart } from "../../../redux/features/cart-slice";
import { HoverBox } from "./NavbarIcons.style";
import { logOutAction } from "../../../redux/features/auth-slice";

function NavbarIcons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsCount = useSelector((state) => state.cart.cartItems.length);

  const logout = () => {
    dispatch(logOutAction());
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HoverBox onClick={() => navigate("/profile")}>
        <AccountCircleIcon fontSize="large" />
      </HoverBox>

      <HoverBox
        onClick={() => {
          navigate("/basket");
        }}
      >
        <LocalGroceryStoreIcon fontSize="large" />
        {itemsCount > 0 && (
          <div
            style={{
              display: "block",
              position: "absolute",
              zIndex: "5",
              color: "#fff",
              backgroundColor: "#000",
              padding: "0 6px",
              borderRadius: "50%",
              fontSize: "11px",
              marginBottom: "41px",
            }}
          >
            {itemsCount}
          </div>
        )}
      </HoverBox>
      <HoverBox onClick={logout}>
        <LogoutIcon fontSize="large" />
      </HoverBox>
    </div>
  );
}

export default NavbarIcons;
