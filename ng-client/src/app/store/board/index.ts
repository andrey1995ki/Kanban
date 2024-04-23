import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BoardState} from "./board.model";

export const getBoardStore = createFeatureSelector<BoardState>('board')

export const getBoards = createSelector(getBoardStore, (state: BoardState) => state.boards)

export const getBoardsLength = createSelector(getBoardStore, (state: BoardState) => state.boards.length)
export const getLoadingBoards = createSelector(getBoardStore, (state: BoardState) => state.boardsLoading)

export const getBoardById = createSelector(getBoardStore, (state: BoardState, id: string) => {
  console.log(id);
  return state.boards.filter((board) => board.id === id)
})

