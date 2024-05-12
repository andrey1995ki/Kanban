import {UsersState} from "./users.model";
import {UsersActions, UsersActionsType} from "./users.actions";

const initialState: UsersState = {
  allUsers: [],
  currentBoardUsers: [],
  isLoadingAll: false,
  isLoadingBoard: false
}
export const usersReducer = (state = initialState, actions: UsersActionsType): UsersState => {
  switch (actions.type) {
    case UsersActions.GetAllUsers:
      return {
        ...state,
        isLoadingAll: true
      }
    case UsersActions.GetBoardUsers:
      return {
        ...state,
        isLoadingBoard: true
      }
    case UsersActions.SetBoardUsers: {
      return {
        ...state,
        currentBoardUsers: actions.payload,
        isLoadingBoard: false
      }
    }
    case UsersActions.SetAllUsers: {
      return {
        ...state,
        allUsers: actions.payload,
        isLoadingAll: false
      }
    }
    case UsersActions.SetAddBoardUser: {
      return {
        ...state,
        currentBoardUsers: [...state.currentBoardUsers, state.allUsers.find(user => user.id === Number(actions.payload))!]
      }
    }
    case UsersActions.SetRemoveBoardUser: {
      return {
        ...state,
        currentBoardUsers: state.currentBoardUsers.filter(user => user.id !== Number(actions.payload))
      }
    }
    default:
      return state
  }
}
