import React, { memo, useEffect, useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable, Animated, Easing } from 'react-native';

interface RescheduleModalProps {
  visible: boolean;
  doctorName?: string;
  onContinue: () => void;
  onClose: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RescheduleModal = memo(({ visible, doctorName, onContinue, onClose }: RescheduleModalProps) => {
  const [internalVisible, setInternalVisible] = useState(visible);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 180,
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
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.92,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setInternalVisible(false);
      });
    }
  }, [overlayOpacity, scale, visible]);

  if (!internalVisible) {
    return null;
  }

  return (
    <Modal animationType="fade" transparent visible onRequestClose={onClose} statusBarTranslucent>
      <AnimatedPressable
        className="flex-1 items-center justify-center px-4"
        style={[styles.overlay, { opacity: overlayOpacity }]}
        onPress={onClose}
      >
        <Pressable onPress={() => {}}>
          <Animated.View
            className="w-full max-w-[360px] rounded-[10px] border border-[rgba(0,0,0,0.1)] bg-white px-6 py-6"
            style={[styles.card, { transform: [{ scale }] }]}
          > 
          <View className="gap-4">
            <Text className="text-center text-2xl font-bold text-[#0F172B]">
              Reschedule Appointment
            </Text>
            <Text className="text-center text-lg font-normal text-[#717182]">
              {doctorName
                ? `Would you like to reschedule your appointment with ${doctorName}?`
                : 'Would you like to reschedule your appointment?'}
            </Text>
          </View>

          <View className="mt-6 gap-2">
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-12 items-center justify-center rounded-lg bg-[#030213]"
              onPress={onContinue}
            >
              <Text className="text-lg font-medium text-white">Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              className="h-12 items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] bg-white"
              onPress={onClose}
            >
              <Text className="text-lg font-medium text-[#0F172B]">Cancel</Text>
            </TouchableOpacity>
          </View>
          </Animated.View>
        </Pressable>
      </AnimatedPressable>
    </Modal>
  );
});

RescheduleModal.displayName = 'RescheduleModal';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    borderRadius: 10,
  },
});

export default RescheduleModal;

