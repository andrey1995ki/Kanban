export interface User {
  login: string
  password: string
}

export interface ApiLoginResponse extends Omit<User, 'password'> {
  id: number
  name: string
  token: string
}

export type ApiGetUserResponse = Omit<ApiLoginResponse, 'token'>
