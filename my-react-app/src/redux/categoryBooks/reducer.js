import { ActionType } from './action';

function categoriesReducer(categories = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.payload.categories;

      case ActionType.EDIT_CATEGORY:
        const updatedCategory = categories.map((category) =>
          category.id === action.payload.category.id
            ? action.payload.category
            : category
        );
        return updatedCategory;
      

    case ActionType.DELETE_CATEGORY:
      return categories.filter(
        (category) => category.id !== action.payload.categoryId
      );

    default:
      return categories;
  }
}

export default categoriesReducer;
