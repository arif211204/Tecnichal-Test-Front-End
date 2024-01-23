import * as React from "react";
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
import { asyncRegisterUser } from "../../redux/authUser/action";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Register() {
  const dispatch = useDispatch();
  const toast = useToast();
  const nav = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    image: null,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewUser((prevUser) => ({
        ...prevUser,
        image: file,
      }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("username", newUser.username);
      formData.append("fullname", newUser.fullname);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("image", newUser.image);
      await dispatch(asyncRegisterUser(formData));
      nav("/login");
      toast({
        title: "Register Successful",
        description: "You have successfully register .",
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
            onSubmit={handleSubmit}
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
                  value={newUser.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Fullname"
                  name="fullname"
                  autoComplete="family-name"
                  value={newUser.fullname}
                  onChange={handleChange}
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
                  value={newUser.email}
                  onChange={handleChange}
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
                  value={newUser.password}
                  onChange={handleChange}
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
              onClick={handleSubmit}
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
}
