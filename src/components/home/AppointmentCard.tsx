import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Entypo } from '@expo/vector-icons';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  date: string;
  location: string;
  isConfirmed?: boolean;
  doctorImage?: any;
}

interface DoctorInfoSectionProps {
  doctorName: string;
  specialty: string;
  isConfirmed: boolean;
  doctorImage?: any;
}

interface AppointmentDetailsSectionProps {
  date: string;
  location: string;
}

interface ActionButtonsSectionProps {
  onAddToCalendar?: () => void;
  onViewDetails?: () => void;
}


const DoctorInfoSection = memo(({
  doctorName,
  specialty,
  isConfirmed,
  doctorImage,
}: DoctorInfoSectionProps) => {
  return (
    <View style={styles.doctorInfoContainer}>
      <View className="flex-row items-center" style={styles.doctorInfoRow}>
        <View className="w-12 h-12 rounded-full overflow-hidden bg-white" style={[styles.avatarContainer, styles.avatarShadow]}>
          <Image
            source={doctorImage || require('../../../assets/images/user.png')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.doctorTextContainer}>
          <Text className="text-[#0F172B]" style={styles.doctorName}>
            {doctorName}
          </Text>
          <Text className="text-[#62748E]" style={styles.specialty}>
            {specialty}
          </Text>
        </View>
        
        {isConfirmed && (
          <View style={styles.confirmedBadge}>
            <Text className="text-[#007A55]" style={styles.confirmedText}>
              Confirmed
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});

DoctorInfoSection.displayName = 'DoctorInfoSection';

const AppointmentDetailsSection = memo(({
  date,
  location,
}: AppointmentDetailsSectionProps) => {
  return (
    <View style={styles.detailsContainer}>
      <View className="flex-row items-center" style={styles.detailRow}>
        <MaterialCommunityIcons name="clock-time-three-outline" size={20} color="#90A1B9" />
        <Text className="text-[#314158]" style={styles.detailText}>
          {date}
        </Text>
      </View>
      <View className="flex-row items-center" style={styles.detailRow}>
        <SimpleLineIcons name="location-pin" size={20} color="#90A1B9" />
        <Text className="text-[#314158]" style={styles.detailText}>
          {location}
        </Text>
      </View>
    </View>
  );
});

AppointmentDetailsSection.displayName = 'AppointmentDetailsSection';

const ActionButtonsSection = memo(({
  onAddToCalendar,
  onViewDetails,
}: ActionButtonsSectionProps) => {
  const handleAddToCalendar = useCallback(() => {
    onAddToCalendar?.();
  }, [onAddToCalendar]);

  const handleViewDetails = useCallback(() => {
    onViewDetails?.();
  }, [onViewDetails]);

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        className="bg-white rounded-[8px]"
        style={styles.addCalendarButton}
        onPress={handleAddToCalendar}
      >
        <Entypo name="calendar" size={18} color="black" />
        <Text className="text-[#0F172B]" style={styles.buttonText}>
          Add to Calendar
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="bg-[#155DFC] rounded-[8px]"
        style={[styles.viewDetailsButton, styles.buttonShadow]}
        onPress={handleViewDetails}
      >
        <Text className="text-white" style={styles.buttonText}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
});

ActionButtonsSection.displayName = 'ActionButtonsSection';

const AppointmentCard = memo(({
  doctorName,
  specialty,
  date,
  location,
  isConfirmed = true,
  doctorImage,
}: AppointmentCardProps) => {
  return (
    <View 
      className="bg-white rounded-[14px] border border-[#E2E8F0] p-4"
      style={[styles.cardShadow, { borderWidth: 0.656, gap: 30 }]}
    >
      <DoctorInfoSection
        doctorName={doctorName}
        specialty={specialty}
        isConfirmed={isConfirmed}
        doctorImage={doctorImage}
      />

      <AppointmentDetailsSection
        date={date}
        location={location}
      />

      <ActionButtonsSection />
    </View>
  );
});

AppointmentCard.displayName = 'AppointmentCard';

export default AppointmentCard;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  doctorInfoContainer: {
    height: 48,
    width: '100%',
  },
  doctorInfoRow: {
    position: 'relative',
    width: '100%',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  doctorTextContainer: {
    marginLeft: 12,
    gap: 1.998,
    flex: 1,
  },
  confirmedBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#ECFDF5',
    borderWidth: 0.656,
    borderColor: '#5EE9B5',
    borderRadius: 8,
    paddingHorizontal: 8.656,
    paddingVertical: 2.656,
    height: 21.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    gap: 7.991,
    width: '100%',
  },
  detailRow: {
    gap: 7.991,
  },
  buttonsContainer: {
    gap: 7.991,
    width: '100%',
    paddingBottom: 0.656,
  },
  addCalendarButton: {
    borderWidth: 0.656,
    borderColor: '#0F172B',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  doctorName: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: '400',
  },
  specialty: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '400',
  },
  confirmedText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '400',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1504,
    fontWeight: '500',
  },
});

