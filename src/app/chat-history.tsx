import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChatHistoryCard from '../components/chat/ChatHistoryCard';

interface ChatRecord {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'incomplete';
  visitStatus: 'Doctor Visit Pending' | 'Doctor Visit Completed' | 'No Visit';
  datetime: string;
  duration: string;
  primaryLabel: string;
  details?: {
    summary: string;
    highlights?: string[];
    followUp?: string;
  };
}

const CHAT_HISTORY: ChatRecord[] = [
  {
    id: 'chat-1',
    title: 'Persistent headaches and light sensitivity',
    status: 'completed',
    visitStatus: 'Doctor Visit Pending',
    datetime: 'Dec 15, 2025    08:00 PM',
    duration: '12 minutes',
    primaryLabel: 'Book Appointment',
  },
  {
    id: 'chat-2',
    title: 'Blood pressure management discussion',
    status: 'completed',
    visitStatus: 'Doctor Visit Completed',
    datetime: 'Oct 21, 2025    10:15 AM',
    duration: '8 minutes',
    primaryLabel: 'View Details',
    details: {
      summary: 'Reviewed recent BP readings and medication adherence. Patient reported improved consistency with monitoring.',
      highlights: [
        'Maintain current medication dosage and monitoring schedule',
        'Schedule follow-up appointment in 4 weeks',
        'Continue daily home BP measurements',
      ],
      followUp: 'Upload BP log next week so the care team can evaluate trends before the follow-up visit.',
    },
  },
  {
    id: 'chat-3',
    title: 'High fever on Friday',
    status: 'completed',
    visitStatus: 'Doctor Visit Completed',
    datetime: 'Oct 18, 2025    4:45 PM',
    duration: '20 minutes',
    primaryLabel: 'View Details',
    details: {
      summary: 'Assessed acute fever and recommended hydration plus alternating acetaminophen and ibuprofen for symptom relief.',
      highlights: [
        'Doctor visit confirmed viral infection with no complications',
        'Encouraged rest and fluid intake for 48 hours',
        'Monitor temperature and escalate if fever exceeds 103°F',
      ],
      followUp: 'Book a clinic visit if fever persists beyond 3 days or if additional symptoms develop.',
    },
  },
  {
    id: 'chat-4',
    title: 'Medication refill for BP medicine',
    status: 'completed',
    visitStatus: 'Doctor Visit Completed',
    datetime: 'Oct 15, 2025    11:20 AM',
    duration: '5 minutes',
    primaryLabel: 'View Details',
    details: {
      summary: 'Confirmed refill request and verified no new side effects. Pharmacy refill submitted for approval.',
      highlights: [
        'Prescription sent to preferred pharmacy',
        'Reminder set for next refill alert in 25 days',
        'Suggested adding meds to weekly pill organizer',
      ],
      followUp: 'Expect pharmacy confirmation within 4 hours. Contact support if the refill is delayed.',
    },
  },
  {
    id: 'chat-5',
    title: 'Chest pain and breathing difficulty',
    status: 'completed',
    visitStatus: 'Doctor Visit Completed',
    datetime: 'Oct 12, 2025    3:00 PM',
    duration: '25 minutes',
    primaryLabel: 'View Details',
    details: {
      summary:
        'Discussed recent episode of chest tightness. Doctor recommended ECG and lab work to rule out cardiac concerns.',
      highlights: [
        'Scheduled cardiology appointment for Oct 18',
        'Provided breathing exercises to manage anxiety episodes',
        'Emergency instructions shared for recurring chest pain',
      ],
      followUp: 'Complete ECG before the cardiology visit and upload the results for review.',
    },
  },
  {
    id: 'chat-6',
    title: 'General health inquiry',
    status: 'incomplete',
    visitStatus: 'No Visit',
    datetime: 'Oct 10, 2025    2:30 PM',
    duration: '0 minutes',
    primaryLabel: 'Resume Chat',
  },
];

const ChatHistoryScreen: React.FC = () => {
  const router = useRouter();

  const chatCards = useMemo(
    () =>
      CHAT_HISTORY.map(({ id, ...chat }) => (
        <ChatHistoryCard
          key={id}
          {...chat}
          onPrimaryAction={() => {
            // integrate navigation when flows exist
          }}
        />
      )),
    [],
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
        <StatusBar barStyle="dark-content" />

        <View className="flex-row items-center gap-4 border-b border-[#E2E8F0] bg-white px-6 pb-3 pt-5">
          <TouchableOpacity
            className="h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F9]"
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={18} color="#0F172B" />
          </TouchableOpacity>

          <View className="mt-5">
            <Text className="text-[#0F172B]" style={styles.headerTitle}>
              Chat History
            </Text>
            <Text className="text-[#64748B]" style={styles.headerSubtitle}>
              Your conversations with Clara
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View className="gap-5 px-6 pb-12 pt-6">{chatCards}</View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ChatHistoryScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
});

