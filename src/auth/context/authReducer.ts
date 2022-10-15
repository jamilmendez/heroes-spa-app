import { types } from "../types/types";

export interface ActionType {
  type: string;
  payload?: string | number | {};
}

interface StateProps {
  logged: boolean;
  name?: string;
}

const initialState: StateProps = {
  logged: false,
};

export const authReducer = (state = initialState, action: ActionType) => {
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
