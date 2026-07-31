export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH: "auth/refresh",
    },
    STUDENTS: {
        BASE: "/students",
        BY_ID: (id:string) => `/students/${id}`,
    },
    ENROLLMENTS: {
        BASE: "/enrollments",
        BY_ID: (id:string) => `/enrollments/${id}`,
    },
    PROFILE: {
        ME: "/profile",
    },
}