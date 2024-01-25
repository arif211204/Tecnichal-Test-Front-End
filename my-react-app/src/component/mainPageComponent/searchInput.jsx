/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import useCustomSearchParams from "../../hooks/useCustomSearchParams";
import { useDispatch } from "react-redux";
import { asyncReceiveBooks } from "../../redux/books/action";
import debounce from "lodash/debounce";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedDispatch = debounce(
    (
      name,
      sortBy,
      orderBy,
      maxYear,
      minYear,
      maxPage,
      minPage,
      category_Id
    ) => {
      dispatch(
        asyncReceiveBooks(
          name,
          sortBy,
          orderBy,
          maxYear,
          minYear,
          maxPage,
          minPage,
          category_Id
        )
      );
    },
    2000
  );

  useEffect(() => {
    debouncedDispatch(
      searchParams?.get("name"),
      searchParams?.get("sortBy"),
      searchParams?.get("orderBy"),
      searchParams?.get("maxYear"),
      searchParams?.get("minYear"),
      searchParams?.get("maxPage"),
      searchParams?.get("minPage"),
      searchParams?.get("category_Id")
    );

    return () => debouncedDispatch.cancel();
  }, [searchParams]);

  useEffect(() => {
    debouncedDispatch(searchTerm);

    return () => debouncedDispatch.cancel();
  }, [searchTerm]);

  return (
    <>
      <TextField
        color="info"
        size="small"
        label="Search Categories 🔍"
        variant="outlined"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        sx={{ width: { md: "70%" } }}
      />
    </>
  );
};

export default SearchInput;
