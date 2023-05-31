import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop:"1px solid rgba(202, 202, 202, 0.61);",
    borderBottom:"1px solid rgba(202, 202, 202, 0.61);",
    padding:"10px",
    fontSize:"14px",
    marginBottom:"20px"
  }));
  