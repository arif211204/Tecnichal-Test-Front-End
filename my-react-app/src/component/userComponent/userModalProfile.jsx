import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUserById } from "../../redux/users/action";

const StyledIconButton = styled(IconButton)({
  color: "rgba(0, 0, 0, 0.6)",
  "&:hover": {
    color: "rgba(0, 0, 0, 0.8)",
  },
});

const ModalUserProfile = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const token = localStorage.getItem("token");
  const url = "http://localhost:2700";
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        dispatch(asyncGetUserById(userId));
      }
    };

    fetchUserProfile();
  }, [dispatch, token]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        {user && (
          <>
            <img
              src={`http://localhost:2700/users/image/${user.id}`}
              alt="Profile"
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
              }}
            />
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUserProfile;
