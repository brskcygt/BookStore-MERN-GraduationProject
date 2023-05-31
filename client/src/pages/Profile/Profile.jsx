import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { updateUser } from "../../redux/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser, updateUser } from "../../redux/features/auth-slice";

import Loading from "../../components/Main/Loading/Loading";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster } from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [user, setUser] = useState({});

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("Bu alan zorunludur!")
      .matches(/^[a-z ,.'-]+$/i, "İsim Türkçe karakter içermemeli!"),
    lastName: yup
      .string()
      .required("Bu alan zorunludur!")
      .matches(/^[a-z ,.'-]+$/i, "Soyisim Türkçe karakter içermemeli!"),
    email: yup
      .string()
      .email("Lütfen geçerli bir email adresi giriniz!")
      .required("Email alanı zorunludur!"),
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

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "150px",
          }}
        >
          <div>
            <h1>Kişisel Bilgilerim</h1>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30ch" },
              }}
              autoComplete="on"
            >
              <form>
                <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                  <TextField
                    label="Adınız"
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    helperText={errors?.firstName?.message}
                    {...register("firstName", {
                      onChange: (e) => handleChange(e),
                    })}
                  />

                  <TextField
                    label="Soyadınız"
                    type="email"
                    name="lastName"
                    value={user.lastName}
                    helperText={errors?.lastName?.message}
                    {...register("lastName", {
                      onChange: (e) => handleChange(e),
                    })}
                  />

                  <TextField
                    label="E-posta Adresi"
                    type="email"
                    name="email"
                    value={user.email}
                    helperText={errors?.email?.message}
                    {...register("email", {
                      onChange: (e) => handleChange(e),
                    })}
                  />

                  <TextField
                    label="Cep Telefonu"
                    type="phone"
                    name="phone"
                    value={user.phone}
                    helperText={errors?.phone?.message}
                    {...register("phone", {
                      onChange: (e) => handleChange(e),
                    })}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#27272a",
                      padding: "10px 50px",
                      borderRadius: "20px",
                      marginTop: 3,
                      marginLeft: 2,
                    }}
                    onClick={() => dispatch(updateUser(user))}
                  >
                    Bilgilerimi Güncelle
                  </Button>
                </FormControl>
              </form>
            </Box>
          </div>
          <div>
            <h1>Şifre Güncelleme</h1>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30ch" },
              }}
              autoComplete="on"
            >
              <form>
                <div>
                  <TextField
                    label="Mevcut Şifreniz"
                    type="password"
                    name="email"
                  />
                </div>
                <div>
                  <TextField label="Yeni Şifre" type="password" name="email" />
                </div>
                <div>
                  <TextField
                    label="Yeni Şifre Tekrar"
                    type="password"
                    name="email"
                  />
                </div>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#27272a",
                    padding: "10px 50px",
                    borderRadius: "20px",
                    marginTop: 3,
                  }}
                >
                  Şifremi Güncelle
                </Button>
              </form>
            </Box>
          </div>
          <Toaster position="bottom-right" />
        </div>
      )}
    </>
  );
}

export default Profile;
