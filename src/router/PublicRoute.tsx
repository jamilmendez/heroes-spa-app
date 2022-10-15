import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {

  const { logged } = useContext(AuthContext);

  return !logged ? children : <Navigate to='/marvel' />
}