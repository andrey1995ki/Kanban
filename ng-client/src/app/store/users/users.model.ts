import {ApiUsersResponse} from "../../services/users/users.model";

export type Users = ApiUsersResponse

export interface UsersState {
  allUsers: Users[]
  currentBoardUsers: Users[]
  isLoadingAll: boolean
  isLoadingBoard: boolean
}
