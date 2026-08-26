import { Pressable, Text } from "react-native";
import { SidebarItemProps } from "../types/navigation.types";

export default function SidebarItem({
    label,
    icon: Icon,
    active = false,
    onPress,
}: SidebarItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className={`mb-2 flex-row items-center rounded-xl px-4 py-3 ${active ? "bg-black" : "bg-transparent"
                }`}
        >
            <Icon
                size={20}
                color={active ? "#ffffff" : "#6b7280"}
                strokeWidth={2}
            />

            <Text
                className={`ml-3 text-base font-medium ${active ? "text-white" : "text-gray-700"
                    }`}
            >
                {label}
            </Text>
        </Pressable>
    );
}