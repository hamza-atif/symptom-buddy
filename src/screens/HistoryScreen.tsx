import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useStorage } from '../hooks/useStorage';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { formatDate } from '../utils/helpers';
import { ChatSession } from '../types';

export const HistoryScreen: React.FC = () => {
  const { theme } = useTheme();
  const { sessions, loading, deleteSession, clearAllSessions } = useStorage();

  const handleDeleteSession = (sessionId: string) => {
    Alert.alert(
      'Delete Session',
      'Are you sure you want to delete this consultation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSession(sessionId),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to delete all consultation history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearAllSessions,
        },
      ]
    );
  };

  const renderSession = ({ item }: { item: ChatSession }) => (
    <Card style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <TouchableOpacity onPress={() => handleDeleteSession(item.id)}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sessionDate}>{formatDate(item.updatedAt)}</Text>
      <Text style={styles.messageCount}>
        {item.messages.length} message{item.messages.length !== 1 ? 's' : ''}
      </Text>
    </Card>
  );

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
    clearButton: {
      ...typography.bodySmall,
      color: theme.colors.error,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      padding: spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyIcon: {
      fontSize: 72,
      marginBottom: spacing.lg,
    },
    emptyTitle: {
      ...typography.h2,
      color: theme.colors.text,
      marginBottom: spacing.md,
      textAlign: 'center',
      fontWeight: '700',
    },
    emptySubtitle: {
      ...typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    sessionCard: {
      marginBottom: spacing.md,
    },
    sessionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.sm,
    },
    sessionTitle: {
      ...typography.h4,
      color: theme.colors.text,
      flex: 1,
      marginRight: spacing.sm,
      fontWeight: '600',
    },
    deleteButton: {
      fontSize: 20,
    },
    sessionDate: {
      ...typography.bodySmall,
      color: theme.colors.textSecondary,
      marginBottom: spacing.xs,
    },
    messageCount: {
      ...typography.caption,
      color: theme.colors.primary,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message="Loading history..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>History</Text>
          {sessions.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptySubtitle}>
            Your consultation history will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={renderSession}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

