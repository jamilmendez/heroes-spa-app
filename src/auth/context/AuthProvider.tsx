import { useReducer } from "react";

import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";
import { ActionType } from "../interfaces/authInterface";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const init = () => {
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null ;

  return {
    logged: !!user,
    user: user ? user : null,
  };
};

export const AuthProvider = ({ children }: Props) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

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
    localStorage.removeItem("user");
    const action: ActionType = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
