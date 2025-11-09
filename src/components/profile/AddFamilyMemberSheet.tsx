import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface NewFamilyMemberPayload {
  name: string;
  age: number;
  relation: string;
  gender: string;
}

interface AddFamilyMemberSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (member: NewFamilyMemberPayload) => void;
}

type SelectField = 'relation' | 'gender' | null;

const RELATION_OPTIONS = ['Self', 'Spouse', 'Daughter', 'Son', 'Parent', 'Sibling', 'Other'];
const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddFamilyMemberSheet = memo(({ visible, onClose, onSubmit }: AddFamilyMemberSheetProps) => {
  const [internalVisible, setInternalVisible] = useState(visible);
  const [selecting, setSelecting] = useState<SelectField>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState('');
  const [gender, setGender] = useState('');

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(60)).current;

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
        Animated.spring(sheetTranslateY, {
          toValue: 0,
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
        Animated.timing(sheetTranslateY, {
          toValue: 60,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setInternalVisible(false);
          setSelecting(null);
          setName('');
          setAge('');
          setRelation('');
          setGender('');
        }
      });
    }
  }, [overlayOpacity, sheetTranslateY, visible]);

  const handleClose = useCallback(() => {
    if (visible) {
      onClose();
    }
  }, [onClose, visible]);

  const toggleSelect = useCallback(
    (field: Exclude<SelectField, null>) => {
      setSelecting((current) => (current === field ? null : field));
    },
    [],
  );

  const handleSelectOption = useCallback((field: Exclude<SelectField, null>, option: string) => {
    if (field === 'relation') {
      setRelation(option);
    } else if (field === 'gender') {
      setGender(option);
    }
    setSelecting(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!name.trim() || !age.trim() || !relation || !gender) {
      return;
    }
    onSubmit({
      name: name.trim(),
      age: Number.parseInt(age.trim(), 10),
      relation,
      gender,
    });
  }, [age, gender, name, onSubmit, relation]);

  const isSubmitDisabled = useMemo(() => {
    return !name.trim() || !age.trim() || !relation || !gender;
  }, [age, gender, name, relation]);

  if (!internalVisible) {
    return null;
  }

  return (
    <Modal animationType="none" transparent visible onRequestClose={handleClose} statusBarTranslucent>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
      >
        <AnimatedPressable
          style={[styles.overlay, { opacity: overlayOpacity }]}
          onPress={handleClose}
        />

        <Animated.View
          style={[styles.sheetContainer, { transform: [{ translateY: sheetTranslateY }] }]}
        >
          <View className="items-center justify-center">
            <View className="h-1.5 w-14 rounded-full bg-[#CBD5F5]" />
          </View>

          <View className="mt-6 flex-row items-center justify-between px-6">
            <Text className="text-xl font-semibold tracking-[-0.45px] text-[#0F172B]">
              Add Family Member
            </Text>
            <TouchableOpacity
              accessibilityLabel="Close add family member form"
              onPress={handleClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="close" size={20} color="#0F172B" />
            </TouchableOpacity>
          </View>

          <View className="mt-6 gap-4 px-6 pb-6">
            <View>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full Name*"
                placeholderTextColor="#90A1B9"
                className="h-14 rounded-2xl border border-[#CAD5E2] bg-white px-4 text-base text-[#0F172B]"
                returnKeyType="next"
              />
            </View>

            <View>
              <TextInput
                value={age}
                onChangeText={(value) => setAge(value.replace(/[^0-9]/g, ''))}
                placeholder="Age*"
                placeholderTextColor="#90A1B9"
                keyboardType="number-pad"
                className="h-14 rounded-2xl border border-[#CAD5E2] bg-white px-4 text-base text-[#0F172B]"
                returnKeyType="next"
                maxLength={3}
              />
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.85}
                className="h-12 flex-row items-center justify-between rounded-xl border border-[#CAD5E2] bg-white px-4"
                onPress={() => toggleSelect('relation')}
              >
                <Text className={`text-sm ${relation ? 'text-[#0F172B]' : 'text-[#717182]'}`}>
                  {relation || 'Select relation'}
                </Text>
                <Ionicons
                  name={selecting === 'relation' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#717182"
                />
              </TouchableOpacity>

              {selecting === 'relation' ? (
                <View className="mt-3 rounded-xl border border-[#E2E8F0] bg-white">
                  {RELATION_OPTIONS.map((option) => {
                    const isActive = option === relation;
                    return (
                      <TouchableOpacity
                        key={option}
                        activeOpacity={0.85}
                        className={`px-4 py-3 ${isActive ? 'bg-[#EEF4FF]' : ''}`}
                        onPress={() => handleSelectOption('relation', option)}
                      >
                        <Text className={`text-sm ${isActive ? 'text-[#155dfc]' : 'text-[#0F172B]'}`}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.85}
                className="h-12 flex-row items-center justify-between rounded-xl border border-[#CAD5E2] bg-white px-4"
                onPress={() => toggleSelect('gender')}
              >
                <Text className={`text-sm ${gender ? 'text-[#0F172B]' : 'text-[#717182]'}`}>
                  {gender || 'Select gender'}
                </Text>
                <Ionicons
                  name={selecting === 'gender' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#717182"
                />
              </TouchableOpacity>

              {selecting === 'gender' ? (
                <View className="mt-3 rounded-xl border border-[#E2E8F0] bg-white">
                  {GENDER_OPTIONS.map((option) => {
                    const isActive = option === gender;
                    return (
                      <TouchableOpacity
                        key={option}
                        activeOpacity={0.85}
                        className={`px-4 py-3 ${isActive ? 'bg-[#EEF4FF]' : ''}`}
                        onPress={() => handleSelectOption('gender', option)}
                      >
                        <Text className={`text-sm ${isActive ? 'text-[#155dfc]' : 'text-[#0F172B]'}`}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <TouchableOpacity
              className={`h-12 items-center justify-center rounded-xl ${isSubmitDisabled ? 'bg-[#95B8FF]' : 'bg-[#155dfc]'}`}
              activeOpacity={0.9}
              disabled={isSubmitDisabled}
              onPress={handleSubmit}
            >
              <Text className="text-base font-semibold text-white">Add Member</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

AddFamilyMemberSheet.displayName = 'AddFamilyMemberSheet';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 43, 0.45)',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    paddingTop: 12,
    width: '100%',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 18,
  },
});

export default AddFamilyMemberSheet;

