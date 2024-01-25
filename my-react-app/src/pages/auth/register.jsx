import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { asyncRegisterUser } from "../../redux/authUser/action";

const defaultTheme = createTheme();

const Register = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const nav = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    image: Yup.mixed().required("Profile image is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("fullname", values.fullname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("image", values.image);

        await dispatch(asyncRegisterUser(formData));
        nav("/login");
        toast({
          title: "Register Successful",
          description: "You have successfully registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        toast({
          title: "Register Failed",
          description: error?.response?.data?.message || error?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("image", file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Fullname"
                  name="fullname"
                  autoComplete="family-name"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullname && Boolean(formik.errors.fullname)
                  }
                  helperText={formik.touched.fullname && formik.errors.fullname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profileImage"
                  type="file"
                  onChange={handleImageChange}
                />
                <Grid item xs={12}>
                  <label htmlFor="profileImage">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="profileImage"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Button variant="contained" component="span" sx={{ mt: 2 }}>
                      Upload Profile Picture
                    </Button>
                  </label>
                  {imagePreview && (
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        alt="Profile Image"
                        src={imagePreview}
                        sx={{
                          width: 100,
                          height: 100,
                          border: "2px solid #ccc",
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
