import { View, Text, Pressable } from "react-native";
import { Megaphone } from "lucide-react-native";

import { Announcement } from "../types/announcement.types";

interface AnnouncementCardProps {
    announcement: Announcement;
    onPress?: () => void;
}

export function AnnouncementCard({
    announcement,
    onPress,
}: AnnouncementCardProps) {
    const formattedDate = new Date(
        announcement.createdDate
    ).toLocaleDateString();

    return (
        <Pressable
            onPress={onPress}
            className="mb-4 rounded-2xl border border-gray-200 bg-white p-5"
        >
            <View className="flex-row items-start">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#F3E8EE]">
                    <Megaphone size={19} color="#7B3446" />
                </View>

                <View className="ml-3 flex-1">
                    <Text
                        numberOfLines={2}
                        className="text-base font-bold text-[#1E293B]"
                    >
                        {announcement.title}
                    </Text>

                    <Text className="mt-1 text-xs text-gray-400">
                        {formattedDate}
                    </Text>
                </View>
            </View>

            <Text
                numberOfLines={3}
                className="mt-4 text-sm leading-5 text-gray-600"
            >
                {announcement.details}
            </Text>

            <View className="mt-4 self-start rounded-full bg-gray-100 px-3 py-1">
                <Text className="text-xs font-medium text-gray-600">
                    {announcement.audience}
                </Text>
            </View>
        </Pressable>
    );
}