import styled from "@emotion/styled";

export const RegisterPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background-color: #eceef0;

  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

export const RegisterImg = styled.div`
  grid-column: 1 / -2;
  height: 100%;
  background-image: url("https://e1.pxfuel.com/desktop-wallpaper/19/275/desktop-wallpaper-book-aesthetic-posted-by-christopher-sellers-library-aesthetic.jpg");
  background-size: cover;
  background-position: center center;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

export const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  margin-bottom: 80px;
`;

export const FieldArea = styled.div`
  display: flex;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: -20px;
  color: red;
  font-size: 14px;
  width: 280px;
`;