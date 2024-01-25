/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import useCustomSearchParams from "../../hooks/useCustomSearchParams";
import { useDispatch } from "react-redux";
import { asyncReceiveBooks } from "../../redux/books/action";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  useEffect(() => {
    const handleSearch = () => {
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
    };

    // Debounce the search function
    const timerId = setTimeout(handleSearch, 300);

    return () => clearTimeout(timerId);
  }, [searchParams]);

  return (
    <>
      <TextField
        color="info"
        size="small"
        label="Search Categories 🔍"
        variant="outlined"
        value={searchParams.get("name") || ""}
        onChange={({ target }) => updateQueryParams({ name: target.value })}
        sx={{ width: { md: "70%" } }}
      />{" "}
    </>
  );
};

export default SearchInput;
