import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, RefreshControl, ScrollView } from "react-native";

import { AnnouncementList } from "@/features/announcements/components/AnnouncementList";
import { getAnnouncements } from "@/features/announcements/services/announcement.services";
import { Announcement } from "@/features/announcements/types/announcement.types";

export default function AnnouncementsScreen() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadAnnouncements() {
        try {
            setError(null);

            const data = await getAnnouncements({
                page: 0,
                size: 20,
                sort: "createdDate",
                direction: "DESC",
            });

            setAnnouncements(data);
        } catch (error) {
            console.error("Failed to load announcements:", error);
            setError("Unable to load announcements.");
        } finally {
            setLoading(false);
        }
    }

    async function handleRefresh() {
        setRefreshing(true);

        try {
            await loadAnnouncements();
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        loadAnnouncements();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FA]">
            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 pb-8"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View className="mt-6 mb-6">
                    <Text className="text-2xl font-bold text-[#1E293B]">
                        Announcements
                    </Text>

                    <Text className="mt-1 text-sm text-gray-500">
                        Stay updated with the latest news
                    </Text>
                </View>

                {error ? (
                    <View className="rounded-2xl bg-white p-6">
                        <Text className="text-center text-sm text-red-500">
                            {error}
                        </Text>
                    </View>
                ) : (
                    <AnnouncementList
                        announcements={announcements}
                        loading={loading}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}