import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6 py-10">
      <View className="items-center mb-5">
        <Text className="text-3xl font-bold text-[#0f172a] mb-2 text-center">
          Welcome to Clara
        </Text>
        <TouchableOpacity
          className="bg-[#155dfc] px-4 py-2 rounded-lg"
          onPress={() => router.push('/profile')}
        >
          <Text className="text-white text-sm font-semibold">View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
