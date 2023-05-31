import { useDispatch, useSelector } from "react-redux";
import BasketDetail from "./BasketDetail/BasketDetail";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getBooksInCart } from "../../../redux/features/cart-slice";
import Loading from "../Loading/Loading";

function Basket() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.cart.isLoading);

  useEffect(()=>{
    dispatch(getBooksInCart());
  },[dispatch]);

  return (
    // <AddBook />
    <>
      {isLoading ? <Loading/> : <BasketDetail />}
      <Toaster position="bottom-right" style={{ padding:"500px" }}/>
    </>
  );
}

export default Basket;
