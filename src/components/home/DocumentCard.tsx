import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface DocumentCardProps {
  title: string;
  date: string;
  fileType: string;
  progress?: number;
  onPress?: () => void;
  showBorder?: boolean;
}


const chevronIconSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 15L12.5 10L7.5 5" stroke="#0F172B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const DocumentCard = memo(({ 
  title, 
  date, 
  fileType, 
  progress, 
  onPress,
  showBorder = true,
}: DocumentCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-start"
      style={{ 
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: showBorder ? 0.656 : 0,
        borderBottomColor: '#E2E8F0',
        gap: 12,
      }}
    >
      <View 
        className="rounded-[10px] items-center justify-center"
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#F1F5F9',
        }}
      >
        <Ionicons name="document-text-outline" size={20} color="#90A1B9" />
      </View>
      
      <View className="flex-1" style={{ gap: 4 }}>
        <Text 
          className="text-[#0F172B]"
          style={{
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: -0.1504,
            fontWeight: '400',
          }}
        >
          {title}
        </Text>
        
        <View className="flex-row items-center" style={{ gap: 6 }}>
          {progress !== undefined && (
            <>
              <Text 
                className="text-[#62748E]"
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  fontWeight: '400',
                }}
              >
                {progress}%
              </Text>
              <Text 
                className="text-[#62748E]"
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  fontWeight: '400',
                }}
              >
                •
              </Text>
            </>
          )}
          <Text 
            className="text-[#62748E]"
            style={{
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '400',
            }}
          >
            {date}
          </Text>
          <Text 
            className="text-[#62748E]"
            style={{
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '400',
            }}
          >
            •
          </Text>
          <Text 
            className="text-[#62748E]"
            style={{
              fontSize: 12,
              lineHeight: 16,
              fontWeight: '400',
            }}
          >
            {fileType}
          </Text>
        </View>
        
        {progress !== undefined && (
          <View 
            className="rounded-full"
            style={{
              height: 4,
              backgroundColor: '#E2E8F0',
              overflow: 'hidden',
            }}
          >
            <View 
              className="rounded-full"
              style={{
                height: 4,
                width: `${progress}%`,
                backgroundColor: '#155DFC',
              }}
            />
          </View>
        )}
      </View>
      
      <View style={{ opacity: 0.4 }}>
        <SvgXml xml={chevronIconSvg} width={20} height={20} />
      </View>
    </TouchableOpacity>
  );
});

DocumentCard.displayName = 'DocumentCard';

export default DocumentCard;

