import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import SelectSortBy from "./selectSortBy";
import SelectOrderBy from "./selectBookBy";
import { useDispatch } from "react-redux";
import { asyncReceiveCategories } from "../../redux/categoryBooks/action";
import ModalUserProfile from "../userComponent/userModalProfile";
import UserProfile from "../userComponent/profileUser";
import CreateBookModal from "../bookcomponent/createBooks";
import SearchInput from "./searchInput";
import { asyncUnsetAuthUser } from "../../redux/authUser/action";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

const Navbar = () => {
  const [setProfile] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isCreateBookModalOpen, setCreateBookModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCloseCreateBookModal = () => {
    setCreateBookModalOpen(false);
  };
  const handleCreateBookClick = () => {
    setCreateBookModalOpen(true);
  };

  const handleProfileClick = (event) => {
    setProfile(event.currentTarget);
  };

  const handleClose = () => {
    setProfile(null);
    setProfileModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logout successful");
    window.location.reload();
  };

  const isUserLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    dispatch(asyncReceiveCategories());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Flex
              justifyContent={"space-around"}
              width="100%"
              alignItems={"center"}
            >
              <Flex w={700} justifyContent="space-around" p={4}>
                <Link
                  to="/"
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: "underline" }}
                >
                  Home
                </Link>
                <Link
                  to="/category"
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: "underline" }}
                >
                  Category
                </Link>
              </Flex>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isUserLoggedIn ? (
                  <Button color="inherit" onClick={handleCreateBookClick}>
                    Create Book
                  </Button>
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Button color="inherit">Login</Button>
                  </Link>
                )}
              </div>
            </Flex>
            <UserProfile
              onProfileClick={handleProfileClick}
              onLogout={handleLogout}
            />
          </Toolbar>
          <Flex justifyContent={"space-between"} gap={5} p={3}>
            <SearchInput />
            <Flex flexDirection={"column"}>
              <SelectSortBy />
              <SelectOrderBy />
            </Flex>
          </Flex>
        </AppBar>

        <CreateBookModal
          open={isCreateBookModalOpen}
          onClose={handleCloseCreateBookModal}
        />

        <ModalUserProfile open={isProfileModalOpen} onClose={handleClose} />
      </ThemeProvider>
    </>
  );
};

export default Navbar;
