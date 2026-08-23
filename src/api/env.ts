export const ENV = {
  dashboardApiUrl: process.env.EXPO_PUBLIC_DASHBOARD_API_URL ?? "",
  userApiUrl: process.env.EXPO_PUBLIC_USER_API_URL ?? "",
  authServerUrl: process.env.EXPO_PUBLIC_AUTH_SERVER_URL ?? "",
  oidcClientId: process.env.EXPO_PUBLIC_OIDC_CLIENT_ID ?? "",
  mobileRedirectUri:
    process.env.EXPO_PUBLIC_MOBILE_REDIRECT_URI ??
    "studentmanagement://oauthredirect",
};