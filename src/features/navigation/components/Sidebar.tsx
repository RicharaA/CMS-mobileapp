import { usePathname, useRouter } from "expo-router";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { LogOut, ShieldCheck, User as UserIcon } from "lucide-react-native";
import { useState } from "react";

import { navigationItems } from "../config/navigation.config";
import { NavigationItem, SidebarProps } from "../types/navigation.types";
import SidebarItem from "./SidebarItem";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Sidebar({
    visible,
    onClose,
}: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { logout, user, primaryRole, hasRole } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (!visible) {
        return null;
    }

    const filteredItems = navigationItems.filter((item) => {
        if (!item.roles || item.roles.length === 0) {
            return true;
        }
        return item.roles.some(
            (role) => primaryRole === role || hasRole(role)
        );
    });

    const handleNavigation = (route: NavigationItem["route"]) => {
        router.push(route);
        onClose();
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            onClose();
        } catch (error) {
            console.error("Failed to log out from sidebar:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <View className="absolute left-0 top-0 z-50 h-full w-72 justify-between bg-white px-4 py-6 shadow-lg border-r border-gray-200">
            <View>
                {/* User Header Profile Badge */}
                <View className="mb-6 pb-4 border-b border-gray-100 flex-row items-center">
                    <View className="h-10 w-10 rounded-full bg-[#7B3446]/10 items-center justify-center mr-3">
                        <UserIcon size={20} color="#7B3446" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-[#1E293B]" numberOfLines={1}>
                            {user?.name || user?.preferred_username || "User"}
                        </Text>
                        <View className="flex-row items-center mt-0.5">
                            <ShieldCheck size={12} color="#7B3446" className="mr-1" />
                            <Text className="text-xs font-semibold text-[#7B3446] uppercase">
                                {primaryRole}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Navigation Items */}
                {filteredItems.map((item) => (
                    <SidebarItem
                        key={item.route.toString()}
                        label={item.label}
                        icon={item.icon}
                        active={pathname === item.route}
                        onPress={() => handleNavigation(item.route)}
                    />
                ))}
            </View>

            <View className="border-t border-gray-200 pt-4 mb-4">
                <Pressable
                    onPress={handleLogout}
                    disabled={isLoggingOut}
                    className="flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-red-50"
                >
                    {isLoggingOut ? (
                        <ActivityIndicator size="small" color="#DC2626" />
                    ) : (
                        <LogOut size={20} color="#DC2626" />
                    )}
                    <Text className="text-sm font-semibold text-red-600">
                        {isLoggingOut ? "Logging out..." : "Log Out"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}