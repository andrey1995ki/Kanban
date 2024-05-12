import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UsersState} from "./users.model";

const getUsersStore = createFeatureSelector<UsersState>('users')

export const getAllUsers = createSelector(getUsersStore, (state: UsersState) => state.allUsers)

export const getBoardUsers = createSelector(getUsersStore, (state: UsersState) => state.currentBoardUsers)

export const getLoadingUsers = createSelector(getUsersStore, (state: UsersState) => state.isLoadingAll)

export const getLoadingBoardUsers = createSelector(getUsersStore, (state: UsersState) => state.isLoadingBoard)
