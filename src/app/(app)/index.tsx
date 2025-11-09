import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import ChatCard from '../../components/home/ChatCard';
import AppointmentCard from '../../components/home/AppointmentCard';
import DocumentCard from '../../components/home/DocumentCard';
import DocumentPreviewModal from '../../components/documents/DocumentPreviewModal';

interface Chat {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  location: string;
  isConfirmed: boolean;
}

interface Document {
  id: string;
  title: string;
  date: string;
  fileType: string;
  progress?: number;
  category: string;
  memberName: string;
  description: string;
}

const RECENT_CHATS: Chat[] = [
  {
    id: '1',
    title: 'Discussed persistent headaches',
    date: 'Today',
    time: '2:30 PM',
  },
  {
    id: '2',
    title: 'General health checkup inquiry',
    date: 'Oct 21',
    time: '10:15 AM',
  },
];

const UPCOMING_APPOINTMENT: Appointment = {
  id: '1',
  doctorName: 'Dr. Priya Sharma',
  specialty: 'General Physician',
  date: 'Oct 25, 2025 at 2:30 PM',
  location: 'Main Clinic, Room 302',
  isConfirmed: true,
};

const DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Blood Test Results - Annual Checkup',
    date: 'Today',
    fileType: 'PDF',
    category: 'Laboratory',
    memberName: 'Aarav Malhotra',
    description: 'A comprehensive panel covering CBC, lipid profile, and metabolic markers for the latest wellness visit.',
  },
  {
    id: '2',
    title: 'Prescription - Antibiotics for Infection',
    date: 'Today',
    fileType: 'PDF',
    category: 'Prescription',
    memberName: 'Aarav Malhotra',
    description: 'Physician-prescribed antibiotic course with dosage instructions and refill information.',
  },
  {
    id: '3',
    title: 'MRI Scan Report - Lower Back Pain',
    date: 'Today',
    fileType: 'PDF',
    progress: 10,
    category: 'Imaging',
    memberName: 'Aarav Malhotra',
    description: 'Preliminary MRI scan findings for lower back pain with radiologist notes and follow-up guidance.',
  },
  {
    id: '4',
    title: 'Vaccination Record - COVID-19 Booster',
    date: '21 Feb',
    fileType: 'PDF',
    category: 'Vaccination',
    memberName: 'Aarav Malhotra',
    description: 'Official vaccination record with batch details and booster schedule information.',
  },
];

const styles = StyleSheet.create({
  greeting: {
    fontSize: 26,
    lineHeight: 36,
    letterSpacing: 0.0703,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: '400',
  },
  viewAllText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '400',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});

export default function HomeScreen(): React.JSX.Element {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const displayName = useMemo(() => {
    if (user?.name) {
      return user.name;
    }
    if (user?.email) {
      // Extract name from email if name is not available
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'User';
  }, [user]);

  const handleViewAllAppointments = useCallback(() => {
    router.push('/appointments');
  }, [router]);

  const handleViewAllChats = useCallback(() => {
    router.push('/chat-history');
  }, [router]);

  const handleViewAllDocuments = useCallback(() => {
    router.push('/documents');
  }, [router]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={['top']}>
          <View className="pt-8 px-4">
            <Text className="text-[#0F172B]" style={styles.greeting}>
              Hey, {displayName}
            </Text>
          </View>
        </SafeAreaView>

        <View className="pt-6 px-4 gap-6">
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-[#0F172B]" style={styles.sectionTitle}>
                Upcoming Appointments
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleViewAllAppointments}>
                <Text className="text-[#009689]" style={styles.viewAllText}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <AppointmentCard
              doctorName={UPCOMING_APPOINTMENT.doctorName}
              specialty={UPCOMING_APPOINTMENT.specialty}
              date={UPCOMING_APPOINTMENT.date}
              location={UPCOMING_APPOINTMENT.location}
              isConfirmed={UPCOMING_APPOINTMENT.isConfirmed}
            />
          </View>

          {/* Recent Chats Section */}
          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-[#0F172B]" style={styles.sectionTitle}>
                Recent Chats
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleViewAllChats}>
                <Text className="text-[#009689]" style={styles.viewAllText}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View 
              className="bg-white rounded-[14px] border border-[#E2E8F0]"
              style={[styles.cardShadow, { borderWidth: 0.656 }]}
            >
              {RECENT_CHATS.map((chat, index) => (
                <ChatCard
                  key={chat.id}
                  title={chat.title}
                  date={chat.date}
                  time={chat.time}
                  onPress={() => router.push('/chat-history')}
                  showBorder={index < RECENT_CHATS.length - 1}
                />
              ))}
            </View>
          </View>

          <View className="gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-[#0F172B]" style={styles.sectionTitle}>
                Documents
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleViewAllDocuments}>
                <Text className="text-[#009689]" style={styles.viewAllText}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View 
              className="bg-white rounded-[14px] border border-[#E2E8F0]"
              style={[styles.cardShadow, { borderWidth: 0.656 }]}
            >
              {DOCUMENTS.map((document, index) => (
                <DocumentCard
                  key={document.id}
                  title={document.title}
                  date={document.date}
                  fileType={document.fileType}
                  progress={document.progress}
                  onPress={() => setSelectedDocument(document)}
                  showBorder={index < DOCUMENTS.length - 1}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <DocumentPreviewModal
        visible={Boolean(selectedDocument)}
        title={selectedDocument?.title ?? ''}
        description={selectedDocument?.description ?? ''}
        category={selectedDocument?.category ?? ''}
        date={selectedDocument?.date ?? ''}
        memberName={selectedDocument?.memberName ?? ''}
        fileType={selectedDocument?.fileType}
        progress={selectedDocument?.progress}
        onDownload={() => setSelectedDocument(null)}
        onShare={() => setSelectedDocument(null)}
        onClose={() => setSelectedDocument(null)}
      />
    </View>
  );
}
