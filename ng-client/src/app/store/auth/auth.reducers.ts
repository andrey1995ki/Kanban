import {AuthState} from "./auth.model";
import {AuthActions, AuthActionsType} from "./auth.actions";

const initialState: AuthState = {
  id: undefined,
  login: undefined,
  token: undefined,
  name: undefined,
  isLoading: true
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthState => {
  switch (action.type) {
    case AuthActions.SetAuth:
      return {...action.payload, isLoading: false}
    case AuthActions.SetUser:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case AuthActions.SetToken:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false
      }
    case AuthActions.ToggleLoading:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
