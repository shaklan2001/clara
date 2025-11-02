import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { ChatHeader } from './_layout';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatActionButton {
  id: string;
  icon: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  text: 'Hey there 👋\nHow are you doing today?',
  isUser: false,
};

const CHAT_ACTIONS: ChatActionButton[] = [
  { id: '1', icon: 'thumbs-up' },
  { id: '2', icon: 'thumbs-down' },
  { id: '3', icon: 'help-circle' },
];

export default function HistoryScreen(): React.JSX.Element {
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = React.useState('');

  const renderMessage = useCallback(({ item }: { item: ChatMessage }) => {
    if (!item.isUser) {
      return (
        <View className="px-4" style={{ paddingTop: 24 }}>
          <View className="bg-neutral-100 rounded-2xl" style={styles.messageBubble}>
            <Text className="text-[#0F172B]" style={styles.messageText}>
              {item.text}
            </Text>
          </View>
          
          <View className="flex-row gap-1 mt-2 pl-1">
            {CHAT_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                activeOpacity={0.7}
                className="w-7 h-7 rounded-lg items-center justify-center"
              >
                <Feather name={action.icon as any} size={16} color="#0F172B" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    return null;
  }, []);

  const ListHeaderComponent = () => <View style={{ height: 16 }} />;

  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: inputText.trim(),
          isUser: true,
        },
      ]);
      setInputText('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [inputText]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ChatHeader />,
          headerShadowVisible: false,
        }}
      />
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />

      <View className="bg-white" style={styles.inputBorder}>
        <SafeAreaView edges={['bottom']} className="bg-white">
          <View className="px-4" style={styles.inputWrapper}>
            <View className="relative">
              <TouchableOpacity
                activeOpacity={0.7}
                className="absolute left-0 bg-[#E8E8E8] w-9 h-9 rounded-full items-center justify-center z-10"
                style={{ top: 4 }}
              >
                <AntDesign name="plus" size={20} color="#0F172B" />
              </TouchableOpacity>
              
              <View className="bg-neutral-100 rounded-3xl ml-11 flex-row items-center justify-between" style={styles.inputContainer}>
                <TextInput
                  className="text-[#90A1B9] flex-1 justify-center items-center"
                  style={styles.inputText}
                  placeholder="Ask anything"
                  placeholderTextColor="#90A1B9"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline={false}
                  maxLength={500}
                />
                
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSend}
                  className="w-5 h-5 items-center justify-center"
                  disabled={!inputText.trim()}
                >
                  <Ionicons
                    name="mic"
                    size={20}
                    color="#0F172B"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    fontWeight: '400',
  },
  inputText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
  },
  messageBubble: {
    maxWidth: 262,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  flatListContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    height: 44,
    borderRadius: 24,
    paddingHorizontal: 16,
    gap: 8,
  },
  inputWrapper: {
    paddingTop: 12,
    paddingBottom: 65,
  },
  inputBorder: {
    borderTopWidth: 0.687,
    borderTopColor: '#F1F5F9',
  },
});

