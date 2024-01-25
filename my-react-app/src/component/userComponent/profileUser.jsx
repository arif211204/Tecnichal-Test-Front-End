import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LogoutIcon from "@mui/icons-material/Logout";
import { asyncGetAllUser } from "../../redux/users/action";
import ModalUserProfile from "./userModalProfile";
import { Avatar, Text } from "@chakra-ui/react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = (selectedUserId) => {
    setSelectedUser(selectedUserId);
    setModalOpen(true);
    handleCloseProfileMenu();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleCloseProfileMenu();
    window.location.reload();
  };

  useEffect(() => {
    dispatch(asyncGetAllUser());
  }, [dispatch]);

  return (
    <>
      <>
        <Avatar
          width={50}
          src={`http://localhost:2700/users/image/${users.id}`}
          alt={users.username}
          size="large"
          edge="end"
          color="inherit"
          aria-label="profile options"
          onClick={handleProfileClick}
        ></Avatar>
        <h5>{users.username}</h5>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem onClick={handleModalOpen}>
            <PermContactCalendarIcon />
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
          </MenuItem>
        </Menu>

        <ModalUserProfile
          open={isModalOpen}
          onClose={handleModalClose}
          user={users}
        />
      </>
    </>
  );
};

export default UserProfile;
