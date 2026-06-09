import { useMemo, useState, type ReactNode } from "react";

import { clearStoredToken, getStoredToken, storeToken } from "../lib/auth-storage";
import type { User } from "../types/api";
import { AuthContext, type AuthContextValue } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, updateUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    setSession: session => {
      storeToken(session.token);
      setToken(session.token);
      updateUser(session.user);
    },
    setUser: updateUser,
    logout: () => {
      clearStoredToken();
      setToken(null);
      updateUser(null);
    },
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
