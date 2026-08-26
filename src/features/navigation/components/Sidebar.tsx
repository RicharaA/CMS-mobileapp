import { usePathname, useRouter } from "expo-router";
import { View } from "react-native";

import { navigationItems } from "../config/navigation.config";
import { NavigationItem, SidebarProps } from "../types/navigation.types";
import SidebarItem from "./SidebarItem";

export default function Sidebar({
    visible,
    onClose,
}: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    if (!visible) {
        return null;
    }

    const handleNavigation = (route: NavigationItem["route"]) => {
        router.push(route);
        onClose();
    };

    return (
        <View className="absolute left-0 top-0 z-50 h-full w-72 bg-white px-4 py-6">
            {navigationItems.map((item) => (
                <SidebarItem
                    key={item.route.toString()}
                    label={item.label}
                    icon={item.icon}
                    active={pathname === item.route}
                    onPress={() => handleNavigation(item.route)}
                />
            ))}
        </View>
    );
}