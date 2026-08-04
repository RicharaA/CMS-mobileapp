import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

export const ENV = {
    dashboardApiUrl: extra?.dashboardApiUrl ?? "",
    userApiUrl: extra?.userApiUrl ?? "",
    authServerUrl: extra?.authServerUrl ?? "",
    oidcClientId: extra?.oidcClientId ?? "",
};