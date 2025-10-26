import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <NativeTabs iconColor="#0f172a" tintColor="#0f172a" backgroundColor="white">
      <NativeTabs.Trigger name="index">
        {Platform.OS === 'ios' ? (
          <Icon
            sf={{
              default: 'house',
              selected: 'house.fill',
            }}
            selectedColor="#0f172a"
          />
        ) : (
          <Icon
            src={<VectorIcon family={MaterialIcons} name="home" />}
            selectedColor="#0f172a"
          />
        )}
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        {Platform.OS === 'ios' ? (
          <Icon
            sf={{
              default: 'person',
              selected: 'person.fill',
            }}
            selectedColor="#0f172a"
          />
        ) : (
          <Icon
            src={<VectorIcon family={MaterialIcons} name="person" />}
            selectedColor="#0f172a"
          />
        )}
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
