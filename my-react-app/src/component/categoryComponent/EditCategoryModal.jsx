import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { asyncEditCategory } from "../../redux/categoryBooks/action";

const EditCategoryModal = ({ isOpen, onClose, category }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [editedCategory, setEditedCategory] = useState({
    name: category?.name || "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const categoryId = category?.id;

      await dispatch(asyncEditCategory(categoryId, editedCategory));
      toast({
        title: "Category Updated",
        description: "The book has been successfully updated.",
        status: "success",
        duration: 6000,
        position: "top",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Updated Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred.",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setEditedCategory({
      name: category?.name || "",
    });
  }, [category]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Category Name</FormLabel>
            <Input
              name="name"
              placeholder="Category Name"
              value={editedCategory?.name}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Edit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;
