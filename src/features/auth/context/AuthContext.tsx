import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { AuthState } from "../types/auth.types";

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [tokens, setTokens] = useState<AuthState["tokens"]>(null);

  const value = useMemo(
    () => ({
      user,
      tokens,
      isAuthenticated: tokens !== null,

      login: async () => {},

      logout: async () => {},
    }),
    [user, tokens]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}