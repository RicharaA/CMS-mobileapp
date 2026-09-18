import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import { ENV } from "@/api/env";
import { StudentProfile } from "@/features/profile/types/profile.types";

export async function getStudentProfile(): Promise<StudentProfile> {
    try {
        const response = await api.get<StudentProfile>(
            ENDPOINTS.STUDENTS.ME
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



