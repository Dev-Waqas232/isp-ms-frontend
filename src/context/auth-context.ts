import { createContext } from "react";

import type { User } from "../types/api";

export type AuthContextValue = {
  token: string | null;
  user: User | null;
  setSession: (session: { token: string; user: User }) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
