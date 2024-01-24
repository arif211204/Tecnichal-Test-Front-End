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

function asyncReceiveBooks() {
  return async (dispatch) => {
    try {
        const { data } = await api.get('/books');
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
