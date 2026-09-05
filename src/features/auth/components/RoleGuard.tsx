import { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { UserRole } from "../types/auth.types";

interface RoleGuardProps {
  allowedRoles: (UserRole | string)[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function RoleGuard({
  allowedRoles,
  fallback = null,
  children,
}: RoleGuardProps) {
  const { hasRole, primaryRole } = useAuthContext();

  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  const isAllowed = allowedRoles.some((role) => {
    if (typeof role === "string") {
      return (
        primaryRole === role ||
        hasRole(role) ||
        hasRole(`ROLE_${role.toUpperCase()}`)
      );
    }
    return primaryRole === role;
  });

  if (!isAllowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
