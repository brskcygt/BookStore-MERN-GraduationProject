import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginAction } from "../../redux/features/auth-slice";
import { LoginForm, LoginImg, LoginPage, Logo } from "./Login.style";
import * as yup from "yup";
import useMaterialForm from "../../hooks/useMaterialForm";
import { TextInputWithController } from "../../components/TextInputWithController";

function Login() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  const yupSchema = yup.object().shape({
    email: yup
      .string()
      .email("Lütfen geçerli bir email adresi giriniz!")
      .required("Email alanı zorunludur!"),
    password: yup.string().required("Şifre alanı zorunludur!"),
  });

  const { registerValid, form } = useMaterialForm({
    yupSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const {
  //   register,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onBlur",
  //   reValidateMode: "onChange",
  //   resolver: yupResolver(schema),
  // });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    const credentials = form.getValues();
    console.log(credentials);
    dispatch(loginAction(credentials));
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <LoginPage>
      <LoginImg />
      <LoginForm>
        <Logo
          src="https://i.ibb.co/Ln6GFyF/logo-no-background.png"
          width={300}
        />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          autoComplete="on"
        >
          <form>
            <div>
              <TextInputWithController
                label="Email"
                type="text"
                title="Mail Adresi / T.C Numarası / Şirket Sicil Numarası"
                {...registerValid("email")}
                onKeyDown={(e) => onEnter(e)}
              />
            </div>
            <br />
            <div>
              <Controller
                control={form.control}
                name="password"
                render={({
                  field: {
                    onChange: onFormChange,
                    value,
                    ...fieldFormProps
                  } = {},
                  fieldState: {
                    error
                  } = {
                    error: props.error
                  }
                })=>(
                   <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
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
                    // value={user.password}
                    // helperText={form.formState.errors?.password?.message}
                    {...registerValid("password")}
                    onChange={(e)=>form.setValue('password',e.target.value)}
                    onKeyDown={(e) => onEnter(e)}
                  />
                </FormControl>
                )}
              />
            </div>
            <br />
          </form>
        </Box>
        <p>
          Hesabınız yok mu?&nbsp;&nbsp;
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            Üye Ol !
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
          onClick={() => login()}
        >
          Giriş Yap
        </Button>
      </LoginForm>
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
              width: "300px",
              height: "50px",
              background: "red",
              color: "white",
              fontSize: "16px",
            },
          },
        }}
      />
    </LoginPage>
  );
}

export default Login;
