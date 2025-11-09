import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface DocumentPreviewModalProps {
  visible: boolean;
  title: string;
  description: string;
  category: string;
  date: string;
  memberName: string;
  fileType?: string;
  progress?: number;
  onDownload?: () => void;
  onShare?: () => void;
  onClose: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DocumentPreviewModal = memo(
  ({
    visible,
    title,
    description,
    category,
    date,
    memberName,
    fileType,
    progress,
    onDownload,
    onShare,
    onClose,
  }: DocumentPreviewModalProps) => {
    const [internalVisible, setInternalVisible] = useState(visible);
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.92)).current;

    useEffect(() => {
      if (visible) {
        setInternalVisible(true);
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 7,
            tension: 160,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 160,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.92,
            duration: 160,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) {
            setInternalVisible(false);
          }
        });
      }
    }, [overlayOpacity, scale, visible]);

    if (!internalVisible) {
      return null;
    }

    return (
      <Modal animationType="fade" transparent visible onRequestClose={onClose} statusBarTranslucent>
        <AnimatedPressable style={[styles.overlay, { opacity: overlayOpacity }]} onPress={onClose}>
          <Pressable onPress={() => {}}>
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
              <View style={styles.fileInfoRow}>
                <View style={styles.fileIconWrapper}>
                  <Ionicons name="document-text-outline" size={20} color="#2563EB" />
                </View>
                <View style={styles.fileMetaWrapper}>
                  {fileType ? (
                    <Text style={styles.fileTypeText}>{fileType.toUpperCase()}</Text>
                  ) : null}
                  <Text style={styles.fileDateText}>{date}</Text>
                  <Text style={styles.fileMemberText}>for {memberName}</Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  accessibilityLabel="Close document preview"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={20} color="#0F172B" />
                </TouchableOpacity>
              </View>

              <View style={styles.titleBlock}>
                <Text className="text-xl font-semibold tracking-[-0.4px] text-[#0F172B]">{title}</Text>
                <Text className="text-sm leading-5 text-[#45556C] mt-3">{description}</Text>
              </View>

              <View className="mt-4 gap-3">
                <View className="flex-row items-center gap-3">
                  <View className="rounded-full border border-[#B9F8CF] bg-[#DCFCE7] px-3 py-1">
                    <Text className="text-xs font-medium text-[#008236]">{category}</Text>
                  </View>
                  {progress !== undefined ? (
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs font-medium text-[#2563EB]">{progress}% complete</Text>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>

              <View className="mt-6 flex-row items-center justify-start gap-3">
                <TouchableOpacity
                  activeOpacity={0.85}
                  className="h-11 flex-row items-center gap-2 rounded-lg bg-[#155dfc] px-5"
                  onPress={onDownload}
                >
                  <Ionicons name="download-outline" size={18} color="#FFFFFF" />
                  <Text className="text-sm font-semibold text-white">Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  className="h-11 flex-row items-center gap-2 rounded-lg border border-[#CBD5F5] bg-white px-5"
                  onPress={onShare}
                >
                  <Ionicons name="share-outline" size={18} color="#0F172B" />
                  <Text className="text-sm font-semibold text-[#0F172B]">Share</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Pressable>
        </AnimatedPressable>
      </Modal>
    );
  },
);

DocumentPreviewModal.displayName = 'DocumentPreviewModal';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#0F172B',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    gap: 12,
  },
  fileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  fileIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E6EDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileMetaWrapper: {
    flex: 1,
    gap: 2,
  },
  fileTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  fileDateText: {
    fontSize: 13,
    color: '#475569',
  },
  fileMemberText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  titleBlock: {
    marginTop: 12,
    gap: 4,
  },
  progressTrack: {
    width: 64,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 999,
    backgroundColor: '#2563EB',
  },
});

export default DocumentPreviewModal;

