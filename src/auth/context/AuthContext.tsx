import { createContext } from "react";
import { AuthContextProps } from "../interfaces/authInterface";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);