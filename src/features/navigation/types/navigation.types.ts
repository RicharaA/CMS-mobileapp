import { Href } from "expo-router";
import { LucideIcon } from "lucide-react-native";

export interface SidebarProps {
    visible: boolean;
    onClose: () => void;
}

export interface SidebarItemProps {
    label: string;
    icon: LucideIcon;
    active: boolean;
    onPress: () => void;
}

export interface NavigationItem {
    label: string;
    route: Href;
    icon: LucideIcon;
}