import React, { useCallback, useMemo, useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import DocumentCard, { DocumentCardProps } from '../components/documents/DocumentCard';
import DocumentPreviewModal from '../components/documents/DocumentPreviewModal';

interface DocumentRecord extends DocumentCardProps {
  id: string;
  fileType?: string;
  progress?: number;
}

const DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc-1',
    title: 'X-Ray - Left Ankle',
    description: 'Minor sprain, no fractures detected. Recommended rest and ice',
    category: 'Imaging',
    date: 'Aug 28, 2024',
    memberName: 'Aarav Malhotra',
    fileType: 'PDF',
  },
  {
    id: 'doc-2',
    title: 'Blood Test - CBC',
    description: 'All values within normal range. Stay hydrated and continue routine exercise',
    category: 'Laboratory',
    date: 'Jun 18, 2024',
    memberName: 'Aarav Malhotra',
    fileType: 'PDF',
  },
  {
    id: 'doc-3',
    title: 'Prescription - Seasonal Allergies',
    description: 'Levocetirizine 5mg once daily for 14 days. Avoid outdoor exposure in peak pollen hours',
    category: 'Prescription',
    date: 'Apr 10, 2024',
    memberName: 'Aarav Malhotra',
    fileType: 'PNG',
    progress: 100,
  },
];

const DocumentsScreen: React.FC = () => {
  const router = useRouter();
  const [previewDocument, setPreviewDocument] = useState<DocumentRecord | null>(null);

  const handleClosePreview = useCallback(() => {
    setPreviewDocument(null);
  }, []);

  const documentCards = useMemo(
    () =>
      DOCUMENTS.map((document) => (
        <DocumentCard
          key={document.id}
          {...document}
          onView={() => setPreviewDocument(document)}
          onDownload={() => setPreviewDocument(document)}
          onShare={() => setPreviewDocument(document)}
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
              Documents & Records
            </Text>
            <Text className="text-[#64748B]" style={styles.headerSubtitle}>
              View and manage medical documents
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View className="gap-6 px-6 pb-12 pt-6">
            <LinearGradient
              colors={['#2B7FFF', '#4F39F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadCard}
            >
              <View className="flex-1 gap-2">
                <Text className="text-base font-medium text-white">Upload a Document</Text>
                <Text className="text-sm font-normal text-blue-100 leading-5">
                  Add medical reports, lab results, or prescriptions
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                className="h-9 flex-row items-center justify-center gap-2 rounded-lg bg-white px-4"
              >
                <Ionicons name="cloud-upload-outline" size={18} color="#155dfc" />
                <Text className="text-sm font-medium text-[#155dfc]">Upload</Text>
              </TouchableOpacity>
            </LinearGradient>

            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Ionicons name="people-outline" size={20} color="#0F172B" />
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                className="h-9 flex-1 flex-row items-center justify-between rounded-lg border border-transparent bg-[#F3F3F5] px-4"
              >
                <Text className="text-sm font-medium text-[#0F172B]">All Family Members</Text>
                <Ionicons name="chevron-down" size={16} color="#0F172B" />
              </TouchableOpacity>
            </View>

            <View className="gap-6">{documentCards}</View>
          </View>
        </ScrollView>
        <DocumentPreviewModal
          visible={Boolean(previewDocument)}
          title={previewDocument?.title ?? ''}
          description={previewDocument?.description ?? ''}
          category={previewDocument?.category ?? ''}
          date={previewDocument?.date ?? ''}
          memberName={previewDocument?.memberName ?? ''}
        fileType={previewDocument?.fileType}
        progress={previewDocument?.progress}
          onDownload={() => {}}
          onShare={() => {}}
          onClose={handleClosePreview}
        />
      </SafeAreaView>
    </>
  );
};

export default DocumentsScreen;

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
  uploadCard: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(53, 81, 255, 0.45)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
});

