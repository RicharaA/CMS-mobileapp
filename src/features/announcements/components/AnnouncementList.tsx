import { View, Text, ActivityIndicator } from "react-native";

import { Announcement } from "../types/announcement.types";
import { AnnouncementCard } from "./AnnouncementCard";

interface AnnouncementListProps {
    announcements: Announcement[];
    loading?: boolean;
    onAnnouncementPress?: (announcement: Announcement) => void;
}

export function AnnouncementList({
    announcements,
    loading = false,
    onAnnouncementPress,
}: AnnouncementListProps) {
    if (loading) {
        return (
            <View className="items-center py-10">
                <ActivityIndicator color="#7B3446" />
            </View>
        );
    }

    if (announcements.length === 0) {
        return (
            <View className="items-center rounded-2xl bg-white px-6 py-10">
                <Text className="text-base font-semibold text-gray-700">
                    No announcements
                </Text>

                <Text className="mt-1 text-center text-sm text-gray-400">
                    There are no announcements available right now.
                </Text>
            </View>
        );
    }

    return (
        <View>
            {announcements.map((announcement) => (
                <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    onPress={() => onAnnouncementPress?.(announcement)}
                />
            ))}
        </View>
    );
}