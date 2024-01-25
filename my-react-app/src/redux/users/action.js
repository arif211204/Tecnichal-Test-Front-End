import { api } from '../../api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
  EDIT_USER: 'EDIT_USER',
  DELETE_USER: 'DELETE_USER',
};
function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function deleteUserActionCreator(userId) {
  return {
    type: ActionType.DELETE_USER,
    payload: {
      userId,
    },
  };
}
function asyncGetAllUser() {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/users');

      dispatch(receiveUsersActionCreator(data.data));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}
function asyncGetUserById(id) {
  return async (dispatch) => {
    try {
      const { data } = await api.get(`/users/${id}`);

      dispatch(receiveUsersActionCreator(data.data));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

function asyncEditUser(id, formData) {
  return async () => {
    try {
      await api.patch(`/users/${id}`, formData);

    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

function asyncDeleteUser(id) {
  return async (dispatch) => {
    try {
      await api.delete(`/users/${id}`);
      dispatch(deleteUserActionCreator(id));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

export { ActionType, asyncGetAllUser, asyncEditUser, asyncDeleteUser,asyncGetUserById };
