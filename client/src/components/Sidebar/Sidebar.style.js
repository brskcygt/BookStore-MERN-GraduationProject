import styled from "@emotion/styled";
import { Link } from "@mui/material";

export const StyledSidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px;
  // border-top-right-radius:40px ;
  // border-bottom-right-radius:90px;
  justify-content: space-between;
  height: 100%;
  background-color: #000; 
`;

export const Hover = styled.div`
  display: flex;
  padding: 10px 60px;
  transition: all 300ms;
  &:hover {
    background-color: #0acfba;
    transition: all 300msg;
    transform: translateX(20px);
  }
`;

export const StyledLink = styled(Link)(() => ({
  color: "#fff",
  display: "flex",
}));