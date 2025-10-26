import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const HERO_IMAGE = require('../../assets/clara-hero.png');

const SlidingButton = () => {
  const { width: screenWidth } = useWindowDimensions();
  const buttonWidth = screenWidth - 64;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const sliderSize = 56;
  const maxSlide = buttonWidth - sliderSize - 8;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= maxSlide) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > maxSlide * 0.8) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Animated.spring(slideAnim, {
            toValue: maxSlide,
            useNativeDriver: false,
            speed: 50,
            bounciness: 0,
          }).start(() => {
            router.push('/auth');
          });
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: false,
            speed: 20,
            bounciness: 8,
          }).start();
        }
      },
    })
  ).current;

  const backgroundWidth = slideAnim.interpolate({
    inputRange: [0, maxSlide],
    outputRange: [sliderSize, buttonWidth - 8],
    extrapolate: 'clamp',
  });

  return (
    <View className="items-center gap-3 w-full">
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 10,
          width: '100%',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 32,
            height: 64,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              height: '100%',
              width: '100%',
              borderRadius: 32,
            }}
          />

          <Animated.View
            style={{
              width: backgroundWidth,
              height: 56,
              position: 'absolute',
              left: 4,
              top: 4,
              borderRadius: 28,
              backgroundColor: '#000',
            }}
          />

          <Animated.View
            {...panResponder.panHandlers}
            style={{
              transform: [{ translateX: slideAnim }],
              position: 'absolute',
              width: sliderSize,
              height: sliderSize,
              borderRadius: sliderSize / 2,
              backgroundColor: '#000',
              left: 4,
              top: 4,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <AntDesign name="arrow-right" size={24} color="white" />
          </Animated.View>

          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#99a1af',
                fontSize: 16,
                fontWeight: '400',
              }}
            >
              Let's Start
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: '#99a1af',
          fontSize: 16,
          fontWeight: '400',
          textAlign: 'center',
        }}
      >
        Slide right to continue
      </Text>
    </View>
  );
};

const StartScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="w-full h-[476px] overflow-hidden">
          <Image
            source={HERO_IMAGE}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 px-8 pt-0 pb-6">
          <View className="items-center gap-4 flex-1 justify-between">
            <View className="items-center gap-2 pt-8">
              <Text className="text-[#101828] text-[36px] font-bold text-center leading-[36px]">
                Welcome to Clara
              </Text>
              <Text className="text-[#6a7282] text-sm font-normal text-center px-2">
                Your trusted health companion for AI-powered medical assistance,
                smart appointments, and family care management
              </Text>
            </View>

            <View className="w-full pb-8">
              <SlidingButton />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;
