import { api } from "../../api";

const ActionType = {
  RECEIVE_BOOK: 'RECEIVE_BOOK',
  EDIT_BOOK: 'EDIT_BOOK', 
  DELETE_BOOK: 'DELETE_BOOK',
}; 

function receiveBooksActionCreator(books) {
  return {
    type: ActionType.RECEIVE_BOOK,
    payload: { books },
  };
}

function editBooksActionCreator(book) { 
  return {
    type: ActionType.EDIT_BOOK,
    payload: { book },  
  };
}

function deleteBooksActionCreator(bookId) {
  return {
    type: ActionType.DELETE_BOOK,
    payload: { bookId },
  };
}

function asyncReceiveBooks(name,sortBy,orderBy,maxYear,minYear,minPage,maxPage,category_Id) {
  return async (dispatch) => {
    try {
      const nameQ = name ? `title=${encodeURIComponent(name)}&` : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const maxYearQ = maxYear ? `maxYear=${encodeURIComponent(maxYear)}` : '';
      const minYearQ = minYear ? `minYear=${encodeURIComponent(minYear)}` : '';
      const maxPageQ = maxPage ? `maxPage=${encodeURIComponent(maxPage)}` : '';
      const minpageQ = minPage ? `minPage=${encodeURIComponent(minPage)}` : '';
      const categoryIdQ =  category_Id && category_Id !== '0'
      ? `category_Id=${encodeURIComponent(category_Id)}&`
      : '';
      const allQuery = `?${nameQ}${sortByQ}${orderByQ}${maxYearQ}${minYearQ}${maxPageQ}${minpageQ}${categoryIdQ}`
      const { data } = await api.get(`/books${allQuery}`);
      console.log(data, 'data book');
      console.log();
      dispatch(receiveBooksActionCreator(data.data));
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    }
  };
}

function asyncCreateBooks(newBookData) {
  return async (dispatch) => {
    try {
     await api.post('/books', newBookData);
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    }
  };
}

function asyncEditBooks(bookId, updatedBookData) {
    return async () => {
        try {
          await api.patch(`/books/${bookId}`, updatedBookData);


      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    };
  }
  

function asyncDeleteBooks(bookId) {
  return async (dispatch) => {
    try {
      await api.delete(`/books/${bookId}`);
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    }
  };
}

export {
  ActionType,
  asyncCreateBooks,
  asyncDeleteBooks,
  asyncEditBooks,
  asyncReceiveBooks,
  editBooksActionCreator,
  deleteBooksActionCreator,
};
