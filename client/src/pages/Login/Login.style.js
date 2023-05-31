import styled from "@emotion/styled";

export const LoginPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background-color: #eceef0;

  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LoginImg = styled.div`
  grid-column: 1 / -2;
  height: 100%;
  background-image: url("https://e0.pxfuel.com/wallpapers/500/630/desktop-wallpaper-able-hogwarts-library-phone-hogwarts-book.jpg");
  background-size: cover;
  background-position: center center;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    cursor: pointer;
    margin-left: 10px;
  }
`;

export const Logo = styled.img`
  margin-bottom: 80px;
`;

// export const ErrorMessage = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 10px;
//   margin-top: -20px;
//   color: red;
//   font-size: 14px;
//   width: 280px;
// `;