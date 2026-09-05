export type AnnouncementAudience = "PUBLIC" | "STUDENT" | "TEACHER" | "ADMIN";

export interface Announcement {
    id: string;
    title: string;
    details: string;
    createdDate: string;
    audience: AnnouncementAudience;
}