
export interface User {
  id: string;
  name: string;
}

export interface AuthState {
  logged: boolean;
  user?: User;
}

export interface ActionType {
  type: string;
  payload?: User;
}

export interface AuthContextProps {
  logged: boolean;
  user?: User;
  login: (name: string) => void;
  logout: () => void;
}
