// CreateBookModal.jsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch } from "react-redux";
import { asyncCreateBooks } from "../../redux/books/action";
import { useToast } from "@chakra-ui/react";

const CreateBookModal = ({ open, onClose }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    release_year: null,
    total_page: null,
    category_id: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateBook = () => {
    try {
      const releaseYear = parseInt(bookData.release_year, 10);
      if (releaseYear < 1980 || releaseYear > 2021) {
        toast({
          title: "Validation Error",
          description: "Release year must be between 1980 and 2021.",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        return;
      }
      dispatch(asyncCreateBooks(bookData));
      toast({
        title: "Create Books Succes",
        description: "Create book has been successfully.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      onClose();

      //   window.location.reload();
    } catch (error) {
      toast({
        title: "Create Book Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Book</DialogTitle>
      <DialogContent>
        {bookData.image_url && (
          <img
            src={bookData.image_url}
            alt="Book Preview"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        )}
        <TextField
          color="info"
          size="small"
          variant="outlined"
          name="image_url"
          label="Image URL"
          fullWidth
          margin="normal"
          value={bookData?.image_url}
          onChange={handleChange}
        />
        <TextField
          color="info"
          size="small"
          variant="outlined"
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={bookData?.title}
          onChange={handleChange}
        />
        <TextField
          color="info"
          size="small"
          variant="outlined"
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={bookData?.description}
          onChange={handleChange}
        />
        <TextField
          color="info"
          size="small"
          variant="outlined"
          name="price"
          label="Price"
          fullWidth
          margin="normal"
          value={bookData?.price}
          onChange={handleChange}
        />
        <TextField
          color="info"
          size="small"
          variant="outlined"
          name="release_year"
          label="release_year"
          fullWidth
          margin="normal"
          value={bookData?.release_year}
          onChange={handleChange}
        />
        <TextField
          color="info"
          size="small"
          variant="outlined"
          name="total_page"
          label="total_page"
          fullWidth
          margin="normal"
          value={bookData?.total_page}
          onChange={handleChange}
        />{" "}
        <TextField
          color="info"
          size="small"
          variant="outlined"
          name="category_id"
          label="category_id"
          fullWidth
          margin="normal"
          value={bookData?.category_id}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          <CancelOutlinedIcon></CancelOutlinedIcon>Cancle
        </Button>
        <Button onClick={handleCreateBook} color="inherit">
          <AddCircleSharpIcon></AddCircleSharpIcon>Create Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBookModal;
