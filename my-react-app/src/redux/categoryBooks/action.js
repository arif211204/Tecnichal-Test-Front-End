import { api } from '../../api';

const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: { categories },
  };
}

function editCategoryActionCreator(category) {
  return {
    type: ActionType.EDIT_CATEGORY,
    payload: { category },
  };
}

function deleteCategoryActionCreator(categoryId) {
  return {
    type: ActionType.DELETE_CATEGORY,
    payload: { categoryId },
  };
}

function asyncReceiveCategories({ name } = {}) {
  return async (dispatch) => {
    try {
      const nameQ = name ? `name=${encodeURIComponent(name)}` : '';
      const allQuery = `?${nameQ}`;

      const { data } = await api.get(`/category${allQuery}`);
      console.log(data,'category');
      dispatch(receiveCategoriesActionCreator(data.data));
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    } 
  };
}

function asyncCreateCategory(categorydata) {
  return async () => {
    try {
      await api.post('/category', categorydata);
      return true;
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
      return false;
    } 
  };
}

function asyncEditCategory(categoryId, editedCategory) {
  return (dispatch) => {
    const updatedCategoryWithTimestamp = {
      ...editedCategory,
      updated_at: new Date().toISOString(),
    };

    api.patch(`/category/${categoryId}`, updatedCategoryWithTimestamp)
      .then(() => {
        dispatch(editCategoryActionCreator({ id: categoryId, ...updatedCategoryWithTimestamp }));
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || error?.message);
      });
  };
}






function asyncDeleteCategory(categoryId) {
  return async (dispatch) => {
    try {
      await api.delete(`/category/${categoryId}`);
      dispatch(deleteCategoryActionCreator(categoryId));
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    } 
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  editCategoryActionCreator,
  deleteCategoryActionCreator,
  asyncReceiveCategories,
  asyncCreateCategory,
  asyncEditCategory,
  asyncDeleteCategory,
};
