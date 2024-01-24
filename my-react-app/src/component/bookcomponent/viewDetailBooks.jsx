import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Image,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch } from "react-redux";
import { asyncDeleteBooks, asyncEditBooks } from "../../redux/books/action";

const ViewDetailBooks = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [editedBook, setEditedBook] = useState({
    title: product.title,
    description: product.description,
    release_year: product.release_year,
    total_page: product.total_page,
    thickness: product.thickness,
    image_url: product.image_url,
    price: product.price,
  });

  const handleEditbook = async () => {
    try {
      const bookId = product?.id;
      console.log(bookId);
      if (bookId) {
        await dispatch(asyncEditBooks(bookId, editedBook));
        onClose();
        toast({
          title: "Book Updated",
          description: "The book has been successfully updated.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
      window.location.reload();
    } catch (error) {
      toast({
        title: "Update Book Failed",
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

  const handleDeletedbook = () => {
    try {
      const bookId = product?.id;
      dispatch(asyncDeleteBooks(bookId));
      toast({
        title: "Create Book Succes",
        description: "Deleted book has been successfully.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      toast({
        title: "Deleted Book Failed",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="2xl">
          {product?.title}
        </ModalHeader>
        <ModalCloseButton color="gray.600" />
        <ModalBody>
          <Image
            src={editedBook?.image_url}
            alt="Book Cover"
            mb={4}
            borderRadius="md"
            boxShadow="md"
            mx="auto"
            maxH="300px"
            objectFit="cover"
          />

          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="image_url"
              value={editedBook?.image_url}
              onChange={handleInputChange}
              placeholder="Enter your image url"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={editedBook?.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={editedBook?.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={editedBook?.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Release Year</FormLabel>
            <Input
              name="release_year"
              value={editedBook?.release_year}
              onChange={handleInputChange}
              placeholder="Release Year"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Total Pages</FormLabel>
            <Input
              name="total_page"
              value={editedBook?.total_page}
              onChange={handleInputChange}
              placeholder="Total Pages"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Thickness</FormLabel>
            <Input
              name="thickness"
              value={editedBook?.thickness}
              onChange={handleInputChange}
              placeholder="Thickness"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            onClick={handleEditbook}
            colorScheme="blue"
            leftIcon={<DriveFileRenameOutlineIcon />}
          >
            Edit Book
          </Button>
          <Button
            onClick={handleDeletedbook}
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            ml={4}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewDetailBooks;
