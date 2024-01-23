import { ActionType } from '../authUser/action';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;

    case ActionType.DELETE_USER:
      const deletedUserId = action.payload.userId;
      const updatedUsers = users.filter((user) => user.id !== deletedUserId);
      return {
        users: updatedUsers,
      };
    default:
      return users;
  }
}

export default usersReducer;
