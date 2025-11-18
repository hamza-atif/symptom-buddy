import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatTime } from '../../utils/helpers';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { theme } = useTheme();
  const isUser = message.sender === 'user';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    bubble: {
      maxWidth: '75%',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      backgroundColor: isUser
        ? theme.colors.userBubble
        : theme.colors.aiBubble,
      ...shadows.sm,
      borderWidth: 1,
      borderColor: isUser ? theme.colors.userBubble : theme.colors.border,
    },
    text: {
      ...typography.body,
      color: isUser ? '#FFFFFF' : theme.colors.text,
      lineHeight: 22,
    },
    timestamp: {
      ...typography.caption,
      color: isUser ? 'rgba(255,255,255,0.8)' : theme.colors.textSecondary,
      marginTop: spacing.sm,
      fontSize: 11,
    },
    icon: {
      fontSize: 12,
      marginRight: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
        <Text style={styles.timestamp}>
          {isUser ? '👤' : '🤖'} {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

