import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface DocumentCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  memberName: string;
  onView?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const DocumentCard = memo(
  ({ title, description, category, date, memberName, onView, onDownload, onShare }: DocumentCardProps) => {
    const actionButtons = useMemo(
      () => [
        { icon: 'eye-outline' as const, label: 'View', handler: onView },
        { icon: 'download-outline' as const, label: 'Download', handler: onDownload },
        { icon: 'share-social-outline' as const, label: 'Share', handler: onShare },
      ],
      [onDownload, onShare, onView],
    );

    return (
      <View className="rounded-2xl bg-white" style={styles.card}>
        <View className="flex-row gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#E6EDFF]">
            <Ionicons name="document-text-outline" size={22} color="#2563EB" />
          </View>

          <View className="flex-1">
            <View className="gap-2">
              <Text className="text-base font-medium text-[#0F172B]">{title}</Text>
              <Text className="text-sm font-normal text-[#45556C] leading-5">{description}</Text>
            </View>

            <View className="mt-4 flex-row flex-wrap items-center gap-3">
              <View className="rounded-lg border border-[#B9F8CF] bg-[#DCFCE7] px-3 py-1">
                <Text className="text-xs font-medium text-[#008236]">{category}</Text>
              </View>
              <Text className="text-sm font-normal text-[#62748E]">{date}</Text>
              <View className="flex-row items-center gap-2">
                <View className="rounded-lg px-2">
                  <Text className="text-xs font-medium text-[#0F172B]">• {memberName}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-6 flex-row items-center justify-start gap-3">
          {actionButtons.map((action) => (
            <TouchableOpacity
              key={action.label}
              activeOpacity={0.85}
              className="h-8 flex-row items-center justify-center gap-2 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3"
              onPress={action.handler}
            >
              <Ionicons name={action.icon} size={16} color="#0F172B" />
              <Text className="text-sm font-medium text-[#0F172B]">{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  },
);

DocumentCard.displayName = 'DocumentCard';

const styles = StyleSheet.create({
  card: {
    borderColor: '#E2E8F0',
    borderWidth: 0.7,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#0F172B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 8,
  },
});

export default DocumentCard;

