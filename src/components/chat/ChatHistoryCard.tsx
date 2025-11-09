import React, { memo, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ChatStatus = 'completed' | 'pending' | 'incomplete';
type VisitStatus = 'Doctor Visit Pending' | 'Doctor Visit Completed' | 'No Visit';

export interface ChatHistoryCardProps {
  title: string;
  status: ChatStatus;
  visitStatus: VisitStatus;
  datetime: string;
  duration: string;
  onPrimaryAction?: () => void;
  primaryLabel: string;
  details?: {
    summary: string;
    highlights?: string[];
    followUp?: string;
  };
}

const STATUS_THEME: Record<ChatStatus, { background: string; text: string }> = {
  completed: { background: '#EEF4FF', text: '#2563EB' },
  pending: { background: '#FEF3C7', text: '#B45309' },
  incomplete: { background: '#FFE4E6', text: '#C026D3' },
};

const VISIT_THEME: Record<VisitStatus, { background: string; text: string }> = {
  'Doctor Visit Pending': {
    background: '#FDE68A',
    text: '#92400E',
  },
  'Doctor Visit Completed': {
    background: '#DCFCE7',
    text: '#047857',
  },
  'No Visit': {
    background: '#E2E8F0',
    text: '#475569',
  },
};

const ChatHistoryCard = memo(
  ({
    title,
    status,
    visitStatus,
    datetime,
    duration,
    onPrimaryAction,
    primaryLabel,
    details,
  }: ChatHistoryCardProps) => {
    const statusTheme = useMemo(() => STATUS_THEME[status], [status]);
    const visitTheme = useMemo(() => VISIT_THEME[visitStatus], [visitStatus]);
    const [expanded, setExpanded] = useState(false);

    const primaryLabelLower = primaryLabel.toLowerCase();
    const isResumeAction = primaryLabelLower.includes('resume');
    const isDetailAction = primaryLabelLower.includes('view') && Boolean(details);

    const toggleDetail = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded((prev) => !prev);
    };

    const handlePrimaryPress = () => {
      if (isDetailAction) {
        toggleDetail();
      } else {
        onPrimaryAction?.();
      }
    };

    const primaryIconName = useMemo(() => {
      if (isDetailAction) {
        return expanded ? 'chevron-up-outline' : 'chevron-down-outline';
      }
      if (primaryLabelLower.includes('book')) {
        return 'calendar-outline';
      }
      if (primaryLabelLower.includes('resume')) {
        return 'play-circle-outline';
      }
      return 'eye-outline';
    }, [expanded, isDetailAction, primaryLabelLower]);

    const effectivePrimaryLabel = useMemo(() => {
      if (isDetailAction) {
        return expanded ? 'Hide Details' : 'View Details';
      }
      return primaryLabel;
    }, [expanded, isDetailAction, primaryLabel]);

    return (
      <View className="rounded-2xl bg-white" style={styles.card}>
        <View className="flex-row gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#E6EDFF]">
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#2563EB" />
          </View>

          <View className="flex-1 gap-4">
            <View className="flex-row items-start justify-between gap-3">
              <Text className="flex-1 text-base font-semibold text-[#0F172B]">{title}</Text>
              <View className="rounded-full px-3 py-1" style={{ backgroundColor: statusTheme.background }}>
                <Text className="text-xs font-medium" style={{ color: statusTheme.text }}>
                  {status}
                </Text>
              </View>
            </View>

            <View className="gap-3">
              <View
                className="self-start rounded-full px-3 py-1"
                style={{ backgroundColor: visitTheme.background }}
              >
                <Text className="text-xs font-medium" style={{ color: visitTheme.text }}>
                  {visitStatus}
                </Text>
              </View>

              <View className="gap-1">
                <Text className="text-sm font-medium text-[#155dfc]">{datetime}</Text>
                <Text className="text-sm font-normal text-[#64748B]">Duration: {duration}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              className={`h-11 flex-row items-center justify-center gap-2 rounded-xl ${
                isResumeAction ? 'bg-[#155dfc]' : 'border border-black bg-white'
              }`}
              onPress={handlePrimaryPress}
            >
              <Ionicons
                name={primaryIconName}
                size={18}
                color={isResumeAction ? '#FFFFFF' : '#0F172B'}
              />
              <Text
                className="text-sm font-semibold"
                style={{ color: isResumeAction ? '#FFFFFF' : '#0F172B' }}
              >
                {effectivePrimaryLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {details && expanded ? (
          <View style={styles.detailContainer}>
            <View style={styles.detailSection}>
              <Text style={styles.detailHeading}>Visit Summary</Text>
              <Text style={styles.detailBody}>{details.summary}</Text>
            </View>

            {details.highlights && details.highlights.length > 0 ? (
              <View style={styles.detailSection}>
                <Text style={styles.detailHeading}>Key Highlights</Text>
                <View style={styles.detailList}>
                  {details.highlights.map((highlight) => (
                    <View key={highlight} style={styles.detailListItem}>
                      <View style={styles.detailBullet} />
                      <Text style={styles.detailListText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            {details.followUp ? (
              <View style={styles.detailSection}>
                <Text style={styles.detailHeading}>Suggested Next Steps</Text>
                <Text style={styles.detailBody}>{details.followUp}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  },
);

ChatHistoryCard.displayName = 'ChatHistoryCard';

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.7,
    borderColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#0F172B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 12,
  },
  detailContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
  },
  detailSection: {
    gap: 8,
  },
  detailHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172B',
  },
  detailBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#45556C',
  },
  detailList: {
    gap: 8,
  },
  detailListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  detailBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginTop: 6,
  },
  detailListText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#45556C',
  },
});

export default ChatHistoryCard;

