import { ActionType } from './action';

const booksReducer = (books = [], action) => {
  switch (action.type) {
    case ActionType.RECEIVE_BOOK:
      return action.payload.books

      case ActionType.EDIT_BOOK:
        const updatedBooks = books.map((book) =>
          book.id === action.payload.book.id
            ? {
                ...book,
                imageUrl: action.payload.book.image_url || book.image_url,
                ...action.payload.book,
              }
            : book
        );
        return {
          books: updatedBooks,
        };
    case ActionType.DELETE_BOOK:
      return {
        books: books.filter((book) => book.id !== action.payload.bookId),
      };


    default:
      return  books ; 
  }
};

export default booksReducer;
