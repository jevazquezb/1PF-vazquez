import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";
import { AuthActions } from "./auth.actions";

export interface State {
  authUser: User | null;
}

export const authFeatureKey = 'auth';

const initialState: State = {
  authUser: null
};

export const reducer = createReducer(initialState,
  on(AuthActions.setAuthUser, (state, action) => {
    return {
      ...state,
      authUser: action.data
    }
  }),
  on(AuthActions.resetState, (state, action) => initialState)
);