export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH: "/auth/refresh",
    },
    STUDENTS: {
        BASE: "/students",
        ME: "/students/me",
    },
    ENROLLMENTS: {
        BASE: "/enrollments",
        BY_ID: (id: string) => `/enrollments/${id}`,
    },
    ANNOUNCEMENTS: {
        BASE: "/announcements",
        BY_ID: (id: string) => `/announcements/${id}`,
    },
    FEE: {
        BASE: "/fees",
        BY_ID: (id: string) => `/fees/${id}`,
    },
}