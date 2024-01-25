// TableCategory.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  chakra,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteCategory,
  asyncReceiveCategories,
} from "../../redux/categoryBooks/action";
import { format } from "date-fns";
import EditCategoryModal from "./EditCategoryModal";
import CreateNewCategoryModal from "./CreateNewCategory";

const StyledTable = chakra(Table, {
  baseStyle: {
    borderCollapse: "collapse",
    width: "100%",
  },
});

const TableCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.category);
  const isAuthenticated = localStorage.getItem("token");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncReceiveCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(asyncDeleteCategory(id));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
  };
  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <>
      {isAuthenticated && (
        <Button
          onClick={handleCreateModalOpen}
          colorScheme="teal"
          mt={4}
          right={0}
        >
          Create New Category
        </Button>
      )}
      <StyledTable>
        <TableCaption>Categories</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories?.map((category) => (
            <Tr key={category?.id}>
              <Td borderWidth="1px">{category?.id}</Td>
              <Td borderWidth="1px">{category?.name}</Td>
              <Td borderWidth="1px">
                {category?.createdAt || category?.created_at
                  ? format(
                      new Date(category?.createdAt || category?.created_at),
                      "yyyy-MM-dd HH:mm:ss"
                    )
                  : "Loading..."}
              </Td>

              <Td borderWidth="1px">
                {category?.updated_at || category?.updatedAt
                  ? format(
                      new Date(category?.updated_at || category?.updatedAt),
                      "yyyy-MM-dd HH:mm:ss"
                    )
                  : "Invalid Date"}
              </Td>
              <Td borderWidth="1px">
                {isAuthenticated && (
                  <>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      mr={2}
                      onClick={() => handleEdit(category)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(category.id)}
                    />
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </StyledTable>
      <CreateNewCategoryModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        category={selectedCategory}
      />
    </>
  );
};

export default TableCategory;
