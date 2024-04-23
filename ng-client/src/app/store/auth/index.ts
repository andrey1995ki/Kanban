import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.model";

const GetAuthSelector = createFeatureSelector<AuthState>('auth')

export const GetToken = createSelector(GetAuthSelector, (state: AuthState) => state.token)

export const isLoading = createSelector(GetAuthSelector, (state: AuthState) => state.isLoading)

export const getUser = createSelector(GetAuthSelector, (state: AuthState) => state.name)
