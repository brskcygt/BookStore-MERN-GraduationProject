import styled from "@emotion/styled";

export const StyledBook = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: -1px 3px 7px 7px rgba(84,84,84,0.1);
  transition: all 300ms;
  cursor: pointer;

  &:hover {
    scale: 1.05;
    transition: all 300ms;
  }
`;

export const BookImg = styled.img`
  width: 100px;
  scale: 1;
  transition: all 300ms;
  &:hover {
    scale: 1.1;
    transition: all 300ms;
  }
`;

export const BookInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  margin-left: 10px;
  h1 {
    font-size: 12px;
  }
  span {
    font-size: 10px;
    font-weight: 700;
    color: #000751;
    margin-bottom: 5px;
  }
  p {
    font-size: 10px;
    color: gray;
  }
`;

export const BookPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  width: 120px;
  height: 28px;
  background-color: #000;
  margin-bottom: 8px;
  color: #fff;
  cursor: pointer;

  p {
    font-size: 15px;
    color: #fff;
  }

  span {
    display: none;
    color: white;
    font-size: 13px;
    margin-top: 5px;
  }

  &:hover {
    p {
      display: none;
    }
    span {
      display: block;
    }
  }
`;