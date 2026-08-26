import {
    LayoutDashboard,
    Megaphone,
    User,
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
];