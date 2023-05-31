import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { registerAction } from "../../redux/features/auth-slice";
import {
  FieldArea,
  Logo,
  RegisterForm,
  RegisterImg,
  RegisterPage,
} from "./Register.style";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Register() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
    person: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Lütfen geçerli bir email adresi giriniz!")
      .required("Email alanı zorunludur!"),
    password: yup
      .string()
      .min(8, "Şifreniz 8 karakterden küçük olamaz!")
      .max(32, "Şifreniz 32 karakterden büyük olamaz!")
      .required("Şifre alanı zorunludur!")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        "Şifre en az bir küçük karakter, bir büyük karakter ve bir rakam içermeli!"
      ),
    firstName: yup
      .string()
      .required("Bu alan zorunludur!")
      .matches(/^[a-z ,.'-]+$/i, "İsim Türkçe karakter içermemeli!"),
    lastName: yup
      .string()
      .required("Bu alan zorunludur!")
      .matches(/^[a-z ,.'-]+$/i, "Soyisim Türkçe karakter içermemeli!"),
    username: yup.string().required("Bu alan zorunludur!"),
    phone: yup
      .string()
      .required("Bu alan zorunludur")
      .matches(
        /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        "Geçersiz telefon formatı!"
      ),
  });
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleChange = (e) => {
    if (Object.keys(user.person).includes(e.target.name)) {
      setUser({
        ...user,
        person: { ...user.person, [e.target.name]: e.target.value },
      });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerUser = (userData) => {
    dispatch(registerAction(userData));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <RegisterPage>
      <RegisterImg />
      <RegisterForm>
        <Logo
          src="https://i.ibb.co/Ln6GFyF/logo-no-background.png"
          width={300}
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form>
            <FieldArea>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="outlined-required"
                  label="İsim"
                  name="firstName"
                  helperText={errors?.firstName?.message}
                  value={user.person.firstName}
                  {...register("firstName", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="outlined-required"
                  label="Soyisim"
                  name="lastName"
                  value={user.person.lastName}
                  helperText={errors?.lastName?.message}
                  {...register("lastName", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </FormControl>
            </FieldArea>

            <FieldArea>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="outlined-required"
                  label="Email"
                  name="email"
                  value={user.person.email}
                  helperText={errors?.email?.message}
                  {...register("email", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="outlined-required"
                  label="Username"
                  name="username"
                  helperText={errors?.username?.message}
                  value={user.username}
                  {...register("username", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </FormControl>
            </FieldArea>

            <FieldArea>
              <FormControl
                sx={{ mt: 2, ml: 2, width: "25ch" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  value={user.password}
                  helperText={errors?.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    onChange: (e) => handleChange(e),
                  })}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  id="outlined-required"
                  label="Phone"
                  placeholder="5-- --- ----"
                  name="phone"
                  value={user.person.phone}
                  helperText={errors?.phone?.message}
                  {...register("phone", {
                    onChange: (e) => handleChange(e),
                  })}
                />
              </FormControl>
            </FieldArea>
          </form>
        </Box>
        <p>
          Zaten bir hesabınız var mı?&nbsp;&nbsp;
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Giriş Yap!
          </Link>
        </p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#27272a",
            padding: "10px 50px",
            borderRadius: "20px",
            marginTop: 3,
          }}
          onClick={() => registerUser(user)}
        >
          Üye Ol
        </Button>
      </RegisterForm>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </RegisterPage>
  );
}

export default Register;
