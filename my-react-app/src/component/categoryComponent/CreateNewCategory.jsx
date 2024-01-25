import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { asyncCreateCategory } from "../../redux/categoryBooks/action";

function CreateNewCategoryModal({ onClose, isOpen }) {
  const toast = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(asyncCreateCategory(values));
        toast({
          title: "Create Category Success",
          description: "Create Category has been successfully.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        onClose();
      } catch (error) {
        toast({
          title: "Create Category Failed",
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
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Category</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormControl isInvalid={formik.touched.name && formik.errors.name}>
              <FormLabel>Name:</FormLabel>
              <Input
                type="text"
                placeholder="Enter category name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit">
              Create Category
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateNewCategoryModal;
