import { useDispatch, useSelector } from "react-redux";
import BookCategories from "../../components/Main/Category/BookCategories";
import BookDetail from "../../components/Main/Books/BookDetail/BookDetail";
import { Toaster } from "react-hot-toast";
import BookList from "../../components/Main/Books/BookList/BookList";
import Loading from "../../components/Main/Loading/Loading";
import { getAllBooks } from "../../redux/features/book-slice";
import { useEffect } from "react";
import SearchBar from "../../components/Main/SearchBar/SearchBar";

function Bookstore() {
  const selectedBook = useSelector((state) => state.books.selected);
  const isLoading = useSelector((state) => state.books.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  let componentToRender;

  if (selectedBook) {
    componentToRender = <BookDetail book={selectedBook} />;
  } else {
    componentToRender = <BookList />;
  }

  return (
    // <AddBook />
    <>
      <SearchBar />
      <BookCategories />
      {isLoading ? <Loading /> : componentToRender}
      <Toaster
        position="bottom-right"
        containerStyle={{ top: 20, left: 20, bottom: 20, right: 20 }}
      />
    </>
  );
}

export default Bookstore;
