import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type VisitType = 'video' | 'inPerson';
type StatusVariant = 'confirmed' | 'completed';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  dateTime?: string;
  locationLabel?: string;
  visitType?: VisitType;
  statusLabel?: StatusVariant;
  doctorImage?: any;
  onAddToCalendar?: () => void;
  addToCalendarLabel?: string;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  showActions?: boolean;
  // backwards compatibility props
  date?: string;
  location?: string;
  isConfirmed?: boolean;
}

const STATUS_THEME: Record<StatusVariant, { background: string; text: string; label: string }> = {
  confirmed: {
    background: '#DCFCE7',
    text: '#047857',
    label: 'confirmed',
  },
  completed: {
    background: '#E2E8F0',
    text: '#475569',
    label: 'completed',
  },
};

const VISIT_ICON: Record<VisitType, keyof typeof Ionicons.glyphMap> = {
  video: 'videocam-outline',
  inPerson: 'location-outline',
};

const AppointmentCard = memo(({
  doctorName,
  specialty,
  dateTime,
  locationLabel,
  visitType,
  statusLabel,
  doctorImage,
  onAddToCalendar,
  addToCalendarLabel = 'Add to Calendar',
  onPrimaryAction,
  primaryActionLabel = 'Reschedule',
  showActions = true,
  date,
  location,
  isConfirmed,
}: AppointmentCardProps) => {
  let resolvedStatus: StatusVariant = 'confirmed';
  if (statusLabel) {
    resolvedStatus = statusLabel;
  } else if (isConfirmed === false) {
    resolvedStatus = 'completed';
  }
  const statusTheme = STATUS_THEME[resolvedStatus];

  const resolvedDateTime = dateTime ?? date ?? '';
  const resolvedLocation = locationLabel ?? location ?? '';
  const resolvedVisitType: VisitType = visitType ?? 'inPerson';

  const showAddToCalendar = Boolean(onAddToCalendar);
  const showPrimaryAction = Boolean(onPrimaryAction);

  const handleAddToCalendar = useCallback(() => {
    onAddToCalendar?.();
  }, [onAddToCalendar]);

  const handlePrimaryAction = useCallback(() => {
    onPrimaryAction?.();
  }, [onPrimaryAction]);

  return (
    <View className="bg-white" style={styles.cardContainer}>
      <View className="flex-row justify-between items-start">
        <View className="flex-row gap-3">
          <View className="w-12 h-12 rounded-full overflow-hidden bg-[#F1F5F9]" style={styles.avatarShadow}>
            <Image
              source={doctorImage || require('../../../assets/images/user.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-[#0F172B]" style={styles.doctorName}>
              {doctorName}
            </Text>
            <Text className="text-[#64748B]" style={styles.specialty}>
              {specialty}
            </Text>
          </View>
        </View>

        <View className="px-3 py-1 rounded-full" style={{ backgroundColor: statusTheme.background }}>
          <Text style={[styles.statusText, { color: statusTheme.text }]}>
            {statusTheme.label}
          </Text>
        </View>
      </View>

      <View className="mt-5 gap-3">
        <View className="flex-row items-center gap-3">
          <Ionicons name="time-outline" size={20} color="#64748B" />
          <Text className="text-[#0F172B]" style={styles.detailText}>
            {resolvedDateTime}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <Ionicons name={VISIT_ICON[resolvedVisitType]} size={20} color="#64748B" />
          <Text className="text-[#0F172B]" style={styles.detailText}>
            {resolvedLocation}
          </Text>
        </View>
      </View>

      {showActions && (showAddToCalendar || showPrimaryAction) ? (
        <View className="mt-6 gap-3">
          {showAddToCalendar ? (
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-12 flex-row items-center justify-center gap-2"
              onPress={handleAddToCalendar}
              style={styles.outlineButton}
            >
              <MaterialCommunityIcons name="calendar-blank-outline" size={18} color="#0F172B" />
              <Text className="text-[#0F172B]" style={styles.outlineButtonLabel}>
                {addToCalendarLabel}
              </Text>
            </TouchableOpacity>
          ) : null}

          {showPrimaryAction ? (
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-12 items-center justify-center"
              style={styles.primaryButton}
              onPress={handlePrimaryAction}
            >
              <Text className="text-white" style={styles.primaryButtonLabel}>
                {primaryActionLabel}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
});

AppointmentCard.displayName = 'AppointmentCard';

export default AppointmentCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 14,
    borderWidth: 0.687,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: '#0F172B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 4,
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  doctorName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  specialty: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  outlineButtonLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 0.687,
    borderColor: '#CBD5F5',
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: '#155dfc',
    borderRadius: 8,
  },
  primaryButtonLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
});

