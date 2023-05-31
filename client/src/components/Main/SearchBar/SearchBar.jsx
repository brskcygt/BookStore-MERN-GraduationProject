import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { bookActions } from "../../../redux/features/book-slice";
import { Search, StyledInputBase } from "./SearchBar.style";

function SearchBar() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  return (
    <Search>
      <SearchIcon
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(bookActions.setKeyword(keyword))}
      />
      <StyledInputBase
        placeholder="Search Books/ISBN/Author"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Search>
  );
}

export default SearchBar;
