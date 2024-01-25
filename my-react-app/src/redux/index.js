import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/reducer';
import categoriesReducer from './categoryBooks/reducer';
import usersReducer from './users/reducer';


const store = configureStore({
    reducer: {
        users: usersReducer,
        book: booksReducer,
        category: categoriesReducer

    }
})
export default store;
