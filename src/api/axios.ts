import axios from "axios";
import { ENV } from "./env";
import { getAccessToken } from "@/features/auth/storage/auth.storage";

const api = axios.create({
    baseURL: ENV.dashboardApiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;