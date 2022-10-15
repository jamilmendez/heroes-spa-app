import { types } from "../types/types";
import { ActionType, AuthState } from "../interfaces/authInterface";

const initialState: AuthState = {
  logged: false,
};

export const authReducer = (state = initialState, action: ActionType): AuthState => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
      };

    case types.logout:
      return { logged: false };

    default:
      return state;
  }
};
