import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import { ENV } from "@/api/env";
import { StudentProfile } from "@/features/profile/types/profile.types";

export async function getStudentProfile(): Promise<StudentProfile> {
    try {
        console.log(
            "BASE URL:",
            api.defaults.baseURL
        );

        console.log(
            "REQUEST URL:",
            `${api.defaults.baseURL}/students/me`
        );

        const response = await api.get<StudentProfile>(
            "/students/me"
        );

        console.log(
            "PROFILE RESPONSE:",
            response.data
        );

        return response.data;
    } catch (error: any) {
        console.log("PROFILE REQUEST FAILED");
        console.log("STATUS:", error.response?.status);
        console.log("URL:", error.config?.url);
        console.log("BASE URL:", error.config?.baseURL);
        console.log("FULL URL:", error.config?.baseURL + error.config?.url);
        console.log("RESPONSE:", error.response?.data);

        throw error;
    }
}



