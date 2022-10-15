import { ReactNode, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { ActionType, authReducer } from "./authReducer";

import { types } from "../types/types";

interface Props {
  children: ReactNode;
}

interface PropReducer {
  authState: {} | any;
  dispatch: (actionType: ActionType) => void;
}

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }: Props) => {
  const [authState, dispatch] = useReducer<any, any>(authReducer, {}, init);

  const login = (name = "") => {
    const user = { id: "ABC", name };

    const action: ActionType = {
      type: types.login,
      payload: user,
    };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');
    const action: ActionType = { type: types.logout } 
    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{ 
      ...authState,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
