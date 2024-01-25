import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)({
  color: "rgba(0, 0, 0, 0.6)",
  "&:hover": {
    color: "rgba(0, 0, 0, 0.8)",
  },
});

const ModalEditProfile = ({ open, onClose, user }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSaveChanges = () => {
    // Your logic to save changes
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Edit User Profile</DialogTitle>
      <DialogContent>
        {/* Your editing content here */}
        <TextField
          label="Username"
          value={editedUser.username}
          onChange={(e) =>
            setEditedUser({ ...editedUser, username: e.target.value })
          }
        />
        <TextField
          label="Email"
          value={editedUser.email}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditProfile;
