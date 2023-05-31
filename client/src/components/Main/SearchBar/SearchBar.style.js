import styled from "@emotion/styled";
import { InputBase } from "@mui/material";

export const Search = styled.div`
  position: absolute;
  top: 0;
  margin-top:50px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 300px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 20px;
  padding: 5px;
`;

export const StyledInputBase = styled(InputBase)(() => ({
  width: "100%",
}));

