import { Flex } from "@chakra-ui/react";
import BookCard from "../../component/bookcomponent/bookCard";
import Navbar from "../../component/mainPageComponent/navbar";
import SearchInput from "../../component/mainPageComponent/searchInput";
import SelectSortBy from "../../component/mainPageComponent/selectSortBy";
import SelectOrderBy from "../../component/mainPageComponent/selectBookBy";

function Homepage() {
  return (
    <>
      <Navbar />
      <BookCard />
    </>
  );
}
export default Homepage;
