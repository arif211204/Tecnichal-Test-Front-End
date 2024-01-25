/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, chakra, Image, WrapItem, Wrap } from "@chakra-ui/react";
import { asyncReceiveBooks } from "../../redux/books/action";
import ViewDetailBooks from "./viewDetailBooks";
import { useSearchParams } from "react-router-dom";

const ProductCard = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedBooks, setSelectedBooks] = useState(null);
  const [searchParams] = useSearchParams();
  console.log(searchParams, "data");
  useEffect(() => {
    dispatch(
      asyncReceiveBooks(
        searchParams?.get("name"),
        searchParams?.get("sortBy"),
        searchParams?.get("orderBy"),
        searchParams?.get("maxYear"),
        searchParams?.get("minYear"),
        searchParams?.get("maxPage"),
        searchParams?.get("minPage"),
        searchParams?.get("category_Id")
      )
    );
  }, [dispatch, searchParams]);

  console.log(searchParams, "data");
  const handleModalOpen = (book) => {
    setSelectedBooks(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooks(null);
  };

  const formatPrice = (priceInCents) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(priceInCents / 100);
  };

  return (
    <>
      <div>
        <Flex
          direction="column"
          bg="#ffff"
          _dark={{
            bg: "#3e3e3e",
          }}
          p={30}
          w="full"
        >
          <Wrap spacing="4">
            {books?.map((book, index) => (
              <WrapItem key={index}>
                <Box
                  width={300}
                  maxW="xs"
                  mx="auto"
                  bg="white"
                  _dark={{
                    bg: "gray.800",
                  }}
                  shadow="lg"
                  rounded="lg"
                >
                  <Box px={4} py={2}>
                    <chakra.h1
                      color="gray.800"
                      _dark={{
                        color: "white",
                      }}
                      fontWeight="bold"
                      fontSize="3xl"
                      textTransform="uppercase"
                    >
                      {book.title}
                    </chakra.h1>
                    <chakra.p
                      mt={1}
                      fontSize="sm"
                      color="gray.600"
                      _dark={{
                        color: "gray.400",
                      }}
                    >
                      {book.description}
                    </chakra.p>
                  </Box>

                  <Image
                    h={48}
                    w="full"
                    fit="cover"
                    mt={2}
                    src={book.image_url}
                    alt={book.title}
                    aspectRatio={16 / 9}
                  />

                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    bg="gray.900"
                    roundedBottom="lg"
                  >
                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                      {formatPrice(book.price)}
                    </chakra.h1>
                    <chakra.button
                      onClick={() => handleModalOpen(book)}
                      px={2}
                      py={1}
                      bg="white"
                      fontSize="xs"
                      color="gray.900"
                      fontWeight="bold"
                      rounded="lg"
                      textTransform="uppercase"
                      _hover={{
                        bg: "gray.200",
                      }}
                      _focus={{
                        bg: "gray.400",
                      }}
                    >
                      View Detail
                    </chakra.button>
                  </Flex>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
          {selectedBooks && (
            <ViewDetailBooks
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              product={selectedBooks}
            />
          )}
        </Flex>
      </div>
    </>
  );
};

export default ProductCard;
