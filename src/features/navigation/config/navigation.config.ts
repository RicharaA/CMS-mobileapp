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
    },
    {
        label: "Announcements",
        route: "/announcements",
        icon: Megaphone,
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
        roles: ["STUDENT", "ADMIN", "STAFF"],
    },
];