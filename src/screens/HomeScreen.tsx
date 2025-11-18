import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useStorage } from '../hooks/useStorage';
import { useGemini } from '../hooks/useGemini';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ChatList } from '../components/chat/ChatList';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { Message, ChatSession } from '../types';
import { generateId, generateSessionTitle } from '../utils/helpers';
import { validation } from '../utils/validation';
import { MEDICAL_DISCLAIMER } from '../constants';

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { saveSession } = useStorage();
  const { sendMessage, loading, error } = useGemini();

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [inputText, setInputText] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    // Show disclaimer on first load
    if (showDisclaimer) {
      setTimeout(() => {
        Alert.alert(
          'Medical Disclaimer',
          MEDICAL_DISCLAIMER,
          [{ text: 'I Understand', onPress: () => setShowDisclaimer(false) }]
        );
      }, 500);
    }
  }, [showDisclaimer]);

  const createNewSession = (): ChatSession => {
    return {
      id: generateId(),
      title: 'New Consultation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const handleSendMessage = async () => {
    if (!validation.isNotEmpty(inputText) || loading) return;

    const sanitizedInput = validation.sanitizeInput(inputText);

    // Create session if it doesn't exist
    let session = currentSession;
    if (!session) {
      session = createNewSession();
      setCurrentSession(session);
    }

    // Create user message
    const userMessage: Message = {
      id: generateId(),
      text: sanitizedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update session with user message
    const updatedSession = {
      ...session,
      messages: [...session.messages, userMessage],
      title: session.messages.length === 0 
        ? generateSessionTitle(sanitizedInput)
        : session.title,
      updatedAt: new Date(),
    };

    setCurrentSession(updatedSession);
    setInputText('');

    // Get AI response
    const aiMessage = await sendMessage(sanitizedInput);

    if (aiMessage) {
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiMessage],
        updatedAt: new Date(),
      };
      setCurrentSession(finalSession);
      await saveSession(finalSession);
    }
  };

  const handleNewChat = () => {
    Alert.alert(
      'New Chat',
      'Start a new consultation? Current chat will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'New Chat',
          onPress: () => {
            if (currentSession && currentSession.messages.length > 0) {
              saveSession(currentSession);
            }
            setCurrentSession(null);
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.background,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      ...typography.h3,
      color: theme.colors.text,
      fontWeight: '700',
    },
    newChatButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
    },
    newChatText: {
      ...typography.bodySmall,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xxl,
    },
    emptyIcon: {
      fontSize: 80,
      marginBottom: spacing.xl,
      opacity: 0.8,
    },
    emptyTitle: {
      ...typography.h2,
      color: theme.colors.text,
      marginBottom: spacing.md,
      textAlign: 'center',
      fontWeight: '700',
    },
    emptySubtitle: {
      ...typography.bodyLarge,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 26,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: spacing.lg,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      alignItems: 'flex-end',
    },
    input: {
      flex: 1,
      ...typography.body,
      backgroundColor: theme.colors.background,
      borderRadius: borderRadius.xl,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      marginRight: spacing.md,
      color: theme.colors.text,
      maxHeight: 120,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    sendButton: {
      backgroundColor: theme.colors.primary,
      width: 52,
      height: 52,
      borderRadius: borderRadius.full,
      justifyContent: 'center',
      alignItems: 'center',
      ...shadows.md,
    },
    sendButtonDisabled: {
      opacity: 0.4,
    },
    sendButtonText: {
      fontSize: 26,
      color: '#FFFFFF',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>
              {currentSession?.title || 'Symptom Buddy'}
            </Text>
            {currentSession && currentSession.messages.length > 0 && (
              <TouchableOpacity
                style={styles.newChatButton}
                onPress={handleNewChat}
              >
                <Text style={styles.newChatText}>+ New</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

      {!currentSession || currentSession.messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyTitle}>How are you feeling?</Text>
          <Text style={styles.emptySubtitle}>
            Describe your symptoms and I'll help you understand them better
          </Text>
        </View>
      ) : (
        <ChatList messages={currentSession.messages} />
      )}

        {error && <ErrorMessage message={error} />}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Describe your symptoms..."
            placeholderTextColor={theme.colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!loading}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!validation.isNotEmpty(inputText) || loading) &&
                styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!validation.isNotEmpty(inputText) || loading}
          >
            {loading ? (
              <LoadingSpinner size="small" />
            ) : (
              <Text style={styles.sendButtonText}>↑</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

