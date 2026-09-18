import {
    LayoutDashboard,
    Megaphone,
    User,
    Users,
    BookOpen,
} from "lucide-react-native";
import { NavigationItem } from "../types/navigation.types";

export const navigationItems: NavigationItem[] = [
    {
        label: "Dashboard",
        route: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Profile",
        route: "/profile",
        icon: User,
        roles: ["ADMIN", "STAFF", "STUDENT", "USER"]
    },
    {
        label: "Announcements",
        route: "/announcements",
        icon: Megaphone,
        roles: ["ADMIN", "STUDENT", "USER", "STAFF"]
    },
    {
        label: "Students List",
        route: "/students",
        icon: Users,
        roles: ["ADMIN", "STAFF"],
    },
    {
        label: "Enrollments",
        route: "/enrollments",
        icon: BookOpen,
        roles: ["ADMIN", "STAFF"],
    },
];