import { Feather } from '@expo/vector-icons';
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface ChatCardProps {
  title: string;
  date: string;
  time: string;
  onPress?: () => void;
  showBorder?: boolean;
}

const chevronIconSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 15L12.5 10L7.5 5" stroke="#0F172B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const ChatCard = memo(({ title, date, time, onPress, showBorder = true }: ChatCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        paddingTop: 16,
        paddingBottom: showBorder ? 0.656 : 8,
        paddingHorizontal: 16,
        borderBottomWidth: showBorder ? 0.656 : 0,
        borderBottomColor: '#E2E8F0',
        flexDirection: 'row',
        gap: 12,
      }}
    >
      <View 
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: '#F1F5F9',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name="message-square" size={20} color="#90A1B9" />
      </View>
      
      <View className="flex-1" style={{ gap: 4 }}>
        <Text 
          className="text-[#0F172B]"
          style={{
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: -0.3125,
            fontWeight: '400',
          }}
        >
          {title}
        </Text>
        
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Text 
            className="text-[#62748E]"
            style={{
              fontSize: 14,
              lineHeight: 20,
              letterSpacing: -0.1504,
              fontWeight: '400',
            }}
          >
            {date}
          </Text>
          <Text 
            className="text-[#62748E]"
            style={{
              fontSize: 14,
              lineHeight: 20,
              letterSpacing: -0.1504,
              fontWeight: '400',
            }}
          >
            •
          </Text>
          <Text 
            className="text-[#62748E]"
            style={{
              fontSize: 14,
              lineHeight: 20,
              letterSpacing: -0.1504,
              fontWeight: '400',
            }}
          >
            {time}
          </Text>
        </View>
      </View>
      
      <View style={{ opacity: 0.4 }}>
        <SvgXml xml={chevronIconSvg} width={20} height={20} />
      </View>
    </TouchableOpacity>
  );
});

ChatCard.displayName = 'ChatCard';

export default ChatCard;

