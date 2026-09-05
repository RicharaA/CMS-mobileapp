import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import { StudentFeeProfile } from "../types/fees.types";

export async function getStudentFeeProfile(): Promise<StudentFeeProfile> {
    const response = await api.get<StudentFeeProfile>(
        ENDPOINTS.FEE.BASE
    );

    return response.data;
}