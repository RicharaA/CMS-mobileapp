import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import { Announcement } from "../types/announcement.types";

interface GetAnnouncementsParams {
    page?: number;
    size?: number;
    sort?: string;
    direction?: "ASC" | "DESC";
}

export async function getAnnouncements(
    params: GetAnnouncementsParams = {}
): Promise<Announcement[]> {
    const response = await api.get<Announcement[]>(ENDPOINTS.ANNOUNCEMENTS.BASE, {
        params: {
            page: params.page ?? 0,
            size: params.size ?? 10,
            sort: params.sort,
            direction: params.direction ?? "ASC",
        },
    });

    return response.data;
}