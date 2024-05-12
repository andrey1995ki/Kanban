export interface ApiUsersResponse {
  id: number
  login: string
  name: string
}

export interface ApiUserActionsPayload {
  boardId: string,
  user_id: string
}
