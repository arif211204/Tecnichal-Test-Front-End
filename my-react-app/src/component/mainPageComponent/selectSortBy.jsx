import { Box, MenuItem, TextField } from "@mui/material";
import useCustomSearchParams from "../../hooks/useCustomSearchParams";
import { Flex } from "@chakra-ui/react";

function SelectSortBy() {
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Box display="flex" flexDirection="column" gap={2} width={600}>
      <Flex gap={2}>
        <TextField
          color="info"
          label="Sort by"
          size="small"
          fullWidth
          select
          variant="outlined"
          value={searchParams.get("sortBy") || "select"}
          onChange={({ target }) => updateQueryParams({ sortBy: target.value })}
        >
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="description">Description</MenuItem>
        </TextField>{" "}
        <TextField
          color="info"
          label="Min Year"
          size="small"
          fullWidth
          variant="outlined"
          value={searchParams.get("minYear") || ""}
          onChange={({ target }) =>
            updateQueryParams({ minYear: target.value })
          }
        />
        <TextField
          color="info"
          label="Max Year"
          size="small"
          fullWidth
          variant="outlined"
          value={searchParams.get("maxYear") || ""}
          onChange={({ target }) =>
            updateQueryParams({ maxYear: target.value })
          }
        />{" "}
        <TextField
          color="info"
          label="Min Page"
          size="small"
          fullWidth
          variant="outlined"
          value={searchParams.get("minPage") || ""}
          onChange={({ target }) =>
            updateQueryParams({ minPage: target.value })
          }
        />
        <TextField
          color="info"
          label="Max Page"
          size="small"
          fullWidth
          variant="outlined"
          value={searchParams.get("maxPage") || ""}
          onChange={({ target }) =>
            updateQueryParams({ maxPage: target.value })
          }
        />
      </Flex>
    </Box>
  );
}

export default SelectSortBy;
