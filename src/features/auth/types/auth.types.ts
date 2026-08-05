export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
    idToken?: string;
    expiresAt: number;
    tokenType: string;
}

export interface UserProfile {
    sub: string;
    name?: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    preferred_username?: string;
}

export interface AuthState {
    isAuthenticated :boolean;
    user : UserProfile | null;
    tokens : AuthTokens | null;
}