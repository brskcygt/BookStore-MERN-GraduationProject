import styled from "@emotion/styled";

export const HoverBox = styled.div`
  display: flex;
  width:50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 1px;
  border-radius: 80%;
  cursor: pointer;
  margin-right: 20px;
  transition:all 300ms;
  &:hover {
    background-color: rgba(202, 202, 202, 0.61);
    transition:all 300ms;
  }
`;
