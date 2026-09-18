import { AuthTokens, UserProfile, UserRole } from "../types/auth.types";

/**
 * Safely decodes a JWT token payload without external dependencies.
 */
export function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Standard base64 decode for JSON strings
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.log("Could not parse JWT token payload:", error);
    return null;
  }
}

/**
 * Extracts and normalizes all user roles from JWT tokens and UserProfile.
 */
export function extractRoles(
  tokens?: AuthTokens | null,
  userProfile?: UserProfile | null
): string[] {
  const roleSet = new Set<string>();

  // Helper to add roles array
  const addRoles = (items?: any) => {
    if (!items) return;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (typeof item === "string" && item.trim()) {
          roleSet.add(item.trim());
        }
      });
    } else if (typeof items === "string") {
      items.split(",").forEach((item) => roleSet.add(item.trim()));
    }
  };

  // 1. Inspect Access Token payload
  if (tokens?.accessToken) {
    const accessPayload = decodeJwtPayload(tokens.accessToken);
    console.log("ACCESS TOKEN PAYLOAD:", accessPayload);
    if (accessPayload) {
      addRoles(accessPayload.roles);
      addRoles(accessPayload.authorities);
      addRoles(accessPayload.realm_access?.roles);
    }
  }

  // 2. Inspect ID Token payload
  if (tokens?.idToken) {
    const idPayload = decodeJwtPayload(tokens.idToken);
    console.log("ID TOKEN PAYLOAD:", idPayload);
    if (idPayload) {
      addRoles(idPayload.roles);
      addRoles(idPayload.authorities);
      addRoles(idPayload.realm_access?.roles);
    }
  }

  // 3. Inspect UserProfile roles
  if (userProfile) {
    addRoles(userProfile.roles);
    addRoles((userProfile as any).authorities);
  }
  console.log("FINAL EXTRACTED ROLES:", Array.from(roleSet));
  return Array.from(roleSet);
}

/**
 * Determines the primary user role (ADMIN > STAFF > STUDENT > USER).
 */
export function determinePrimaryRole(roles: string[]): UserRole {
  const normalizedRoles = roles.map((r) => r.toUpperCase());

  if (
    normalizedRoles.some(
      (r) => r === "ROLE_ADMIN" || r === "ADMIN" || r.includes("ADMIN")
    )
  ) {
    return "ADMIN";
  }

  if (
    normalizedRoles.some(
      (r) => r === "ROLE_STAFF" || r === "STAFF" || r.includes("TEACHER") || r.includes("STAFF")
    )
  ) {
    return "STAFF";
  }

  if (
    normalizedRoles.some(
      (r) => r === "ROLE_STUDENT" || r === "STUDENT" || r.includes("STUDENT")
    )
  ) {
    return "STUDENT";
  }

  return "STUDENT";
}
