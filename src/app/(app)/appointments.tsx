import React, { useCallback, useMemo, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppointmentCard from '../../components/home/AppointmentCard';
import RescheduleModal from '../../components/appointments/RescheduleModal';

type AppointmentStatus = 'upcoming' | 'past';

interface AppointmentItem {
  id: string;
  doctorName: string;
  specialty: string;
  dateTime: string;
  locationLabel: string;
  visitType: 'video' | 'inPerson';
  statusLabel: 'confirmed' | 'completed';
  timeline: AppointmentStatus;
}

interface AppointmentActionHandlers {
  onAddToCalendar?: (appointmentId: string) => void;
  onReschedule?: (appointment: AppointmentItem) => void;
  onBookNew?: () => void;
}

const TABS: { id: AppointmentStatus; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
];

const APPOINTMENTS: AppointmentItem[] = [
  {
    id: '1',
    doctorName: 'Dr. Arjun Patel',
    specialty: 'Dermatologist',
    dateTime: 'Oct 28, 2025 at 10:30 AM',
    locationLabel: 'Video Call',
    visitType: 'video',
    statusLabel: 'confirmed',
    timeline: 'upcoming',
  },
  {
    id: '2',
    doctorName: 'Dr. Nina Desai',
    specialty: 'General Physician',
    dateTime: 'Nov 05, 2025 at 09:15 AM',
    locationLabel: 'Main Clinic, Room 204',
    visitType: 'inPerson',
    statusLabel: 'confirmed',
    timeline: 'upcoming',
  },
  {
    id: '3',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    dateTime: 'Oct 20, 2025 at 3:00 PM',
    locationLabel: 'Main Clinic, Room 302',
    visitType: 'inPerson',
    statusLabel: 'completed',
    timeline: 'past',
  },
  {
    id: '4',
    doctorName: 'Dr. Riya Kapoor',
    specialty: 'Cardiologist',
    dateTime: 'Sep 12, 2025 at 5:00 PM',
    locationLabel: 'City Hospital, Block B',
    visitType: 'inPerson',
    statusLabel: 'completed',
    timeline: 'past',
  },
];

interface AppointmentListItemProps {
  appointment: AppointmentItem;
  handlers: AppointmentActionHandlers;
}

const AppointmentListItem = React.memo(function AppointmentListItem({
  appointment,
  handlers,
}: AppointmentListItemProps) {
  const isUpcoming = appointment.timeline === 'upcoming';

  const handleAddToCalendar = useCallback(() => {
    if (!isUpcoming) {
      return;
    }
    handlers.onAddToCalendar?.(appointment.id);
  }, [appointment.id, handlers, isUpcoming]);

  const handlePrimaryAction = useCallback(() => {
    if (!isUpcoming) {
      return;
    }
    handlers.onReschedule?.(appointment);
  }, [appointment, handlers, isUpcoming]);

  return (
    <AppointmentCard
      doctorName={appointment.doctorName}
      specialty={appointment.specialty}
      dateTime={appointment.dateTime}
      locationLabel={appointment.locationLabel}
      visitType={appointment.visitType}
      statusLabel={appointment.statusLabel}
      onAddToCalendar={isUpcoming ? handleAddToCalendar : undefined}
      onPrimaryAction={isUpcoming ? handlePrimaryAction : undefined}
      primaryActionLabel="Reschedule"
      showActions={isUpcoming}
    />
  );
});

AppointmentListItem.displayName = 'AppointmentListItem';

const AppointmentHeaderSection = React.memo(function AppointmentHeaderSection() {
  return (
    <View>
      <Text className="text-[#0F172B]" style={styles.title}>
        Appointments
      </Text>
      <Text className="text-[#62748E]" style={styles.subtitle}>
        Track your upcoming and past visits
      </Text>
    </View>
  );
});

AppointmentHeaderSection.displayName = 'AppointmentHeaderSection';

interface BookNewAppointmentCardProps {
  onPress?: () => void;
}

const BookNewAppointmentCard = React.memo(function BookNewAppointmentCard({
  onPress,
}: BookNewAppointmentCardProps) {
  if (!onPress) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="bg-white rounded-2xl flex-row items-center justify-between"
      style={styles.ctaCard}
      onPress={onPress}
    >
      <View className="gap-1">
        <Text className="text-[#0F172B] font-medium text-lg">
          Need to see a doctor?
        </Text>
        <Text className="text-[#64748B] font-normal text-[12px]">
          Book a new appointment
        </Text>
      </View>

      <View className="h-11 px-5 rounded-xl flex-row items-center gap-2" style={styles.ctaButton}>
        <Ionicons name="add" size={18} color="#FFFFFF" />
        <Text className="text-white" style={styles.ctaButtonLabel}>
          Book Now
        </Text>
      </View>
    </TouchableOpacity>
  );
});

BookNewAppointmentCard.displayName = 'BookNewAppointmentCard';

interface AppointmentTabsProps {
  activeTab: AppointmentStatus;
  tabPressHandlers: Record<AppointmentStatus, () => void>;
}

const AppointmentTabs = React.memo(function AppointmentTabs({
  activeTab,
  tabPressHandlers,
}: AppointmentTabsProps) {
  return (
    <View className="bg-[#EEF4FF] rounded-full p-1 flex-row mb-2" >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        const pressHandler = tabPressHandlers[tab.id];

        return (
          <TouchableOpacity key={tab.id} activeOpacity={0.8} className="flex-1" onPress={pressHandler}>
            <View
              className={`rounded-full items-center justify-center ${isActive ? 'bg-white' : ''}`}
              style={[styles.tabButton, isActive ? styles.activeTab : undefined]}
            >
              <Text
                className="text-[#0F172B]"
                style={[styles.tabLabel, isActive ? styles.tabLabelActive : styles.tabLabelInactive]}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

AppointmentTabs.displayName = 'AppointmentTabs';

const AppointmentListEmpty = React.memo(function AppointmentListEmpty() {
  return (
    <View className="items-center justify-center py-20">
      <Text className="text-[#0F172B]" style={styles.emptyTitle}>
        No appointments here yet
      </Text>
      <Text className="text-[#62748E]" style={styles.emptySubtitle}>
        When you book an appointment, it will show up in this tab.
      </Text>
    </View>
  );
});

AppointmentListEmpty.displayName = 'AppointmentListEmpty';

const AppointmentListSeparator = React.memo(function AppointmentListSeparator() {
  return <View style={styles.separator} />;
});

AppointmentListSeparator.displayName = 'AppointmentListSeparator';

export default function AppointmentsScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<AppointmentStatus>('upcoming');
  const [rescheduleTarget, setRescheduleTarget] = useState<AppointmentItem | null>(null);

  const handlers = useMemo<AppointmentActionHandlers>(() => ({
    onAddToCalendar: () => {
      // hook for calendar integration
    },
    onReschedule: (appointment: AppointmentItem) => {
      setRescheduleTarget(appointment);
    },
    onBookNew: () => {
      // hook for booking navigation
    },
  }), [setRescheduleTarget]);

  const tabPressHandlers = useMemo(
    () => ({
      upcoming: () => setActiveTab('upcoming'),
      past: () => setActiveTab('past'),
    }),
    [],
  );

  const filteredAppointments = useMemo(() => {
    return APPOINTMENTS.filter((appointment) => appointment.timeline === activeTab);
  }, [activeTab]);

  const renderAppointment = useCallback<ListRenderItem<AppointmentItem>>(
    ({ item }) => <AppointmentListItem appointment={item} handlers={handlers} />,
    [handlers],
  );

  const keyExtractor = useCallback((item: AppointmentItem) => item.id, []);

  const renderListEmpty = useCallback(() => <AppointmentListEmpty />, []);
  const renderSeparator = useCallback(() => <AppointmentListSeparator />, []);
  const handleCloseRescheduleModal = useCallback(() => {
    setRescheduleTarget(null);
  }, [setRescheduleTarget]);

  const handleRescheduleContinue = useCallback(() => {
    // hook for continue action
    setRescheduleTarget(null);
  }, [setRescheduleTarget]);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1" style={styles.screenContent}>
        <View className="gap-4 mb-2">
          <AppointmentHeaderSection />
          <BookNewAppointmentCard onPress={handlers.onBookNew} />
          <AppointmentTabs activeTab={activeTab} tabPressHandlers={tabPressHandlers} />
        </View>
        <FlatList
          data={filteredAppointments}
          keyExtractor={keyExtractor}
          renderItem={renderAppointment}
          ListEmptyComponent={renderListEmpty}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
          style={styles.appointmentsList}
        />
      </View>
      <RescheduleModal
        visible={Boolean(rescheduleTarget)}
        doctorName={rescheduleTarget?.doctorName}
        onClose={handleCloseRescheduleModal}
        onContinue={handleRescheduleContinue}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    lineHeight: 36,
    letterSpacing: 0.0703,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '400',
  },
  tabsContainer: {
    gap: 6,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 28,
  },
  activeTab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#0F172B',
  },
  tabLabelInactive: {
    color: '#0F172B',
    opacity: 0.6,
  },
  ctaCard: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  ctaSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  ctaButton: {
    backgroundColor: '#155dfc',
  },
  ctaButtonLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 32,
    paddingTop: 8,
    gap: 24,
  },
  appointmentsList: {
    flex: 1,
  },
  separator: {
    height: 0,
  },
  emptyTitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: '500',
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 240,
  },
});


