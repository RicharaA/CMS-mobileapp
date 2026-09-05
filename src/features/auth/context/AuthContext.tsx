import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { AuthState, UserRole } from "../types/auth.types";
import { removeToken } from "../storage/auth.storage";
import { determinePrimaryRole, extractRoles } from "../utils/jwt.utils";

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;

  setAuth: (
    user: AuthState["user"],
    tokens: AuthState["tokens"]
  ) => void;

  clearAuth: () => Promise<void>;

  isAdmin: boolean;
  isStudent: boolean;
  isStaff: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [tokens, setTokens] = useState<AuthState["tokens"]>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [primaryRole, setPrimaryRole] = useState<UserRole>("USER");

  function setAuth(
    user: AuthState["user"],
    tokens: AuthState["tokens"]
  ) {
    const extractedRoles = extractRoles(tokens, user);
    const mainRole = determinePrimaryRole(extractedRoles);

    setUser(user);
    setTokens(tokens);
    setRoles(extractedRoles);
    setPrimaryRole(mainRole);
  }

  async function clearAuth() {
    try {
      await removeToken();
      console.log("Tokens successfully removed from SecureStore.");
    } catch (err) {
      console.error("Failed to remove token from storage:", err);
    }
    setUser(null);
    setTokens(null);
    setRoles([]);
    setPrimaryRole("USER");
  }

  const hasRole = (targetRole: string): boolean => {
    if (!targetRole) return true;
    const normalizedTarget = targetRole.toUpperCase();

    // Matching either exact string or normalized string
    return roles.some((r) => {
      const norm = r.toUpperCase();
      return (
        norm === normalizedTarget ||
        norm === `ROLE_${normalizedTarget}` ||
        norm.replace("ROLE_", "") === normalizedTarget
      );
    });
  };

  const isAdmin = primaryRole === "ADMIN" || hasRole("ADMIN") || hasRole("ROLE_ADMIN");
  const isStudent = primaryRole === "STUDENT" || hasRole("STUDENT") || hasRole("ROLE_STUDENT");
  const isStaff = primaryRole === "STAFF" || hasRole("STAFF") || hasRole("ROLE_STAFF");

  const value = useMemo(
    () => ({
      user,
      tokens,
      roles,
      primaryRole,
      isAuthenticated: tokens !== null,
      isAdmin,
      isStudent,
      isStaff,
      hasRole,

      login: async () => { },

      logout: async () => { },

      setAuth,

      clearAuth,
    }),
    [user, tokens, roles, primaryRole, isAdmin, isStudent, isStaff]
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
    throw new Error(
      "useAuthContext must be used within AuthProvider"
    );
  }

  return context;
}