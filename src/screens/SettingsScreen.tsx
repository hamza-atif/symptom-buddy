import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { useStorage } from '../hooks/useStorage';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MEDICAL_DISCLAIMER } from '../constants';

export const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useStorage();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
          },
        },
      ]
    );
  };

  const showDisclaimer = () => {
    Alert.alert('Medical Disclaimer', MEDICAL_DISCLAIMER);
  };

  const showAbout = () => {
    Alert.alert(
      'About Symptom Buddy',
      'Version 1.0.0\n\nSymptom Buddy is an AI-powered medical assistant that helps you understand your symptoms and provides general health information.\n\nPowered by Google Gemini AI.\n\n© 2024 Symptom Buddy',
      [{ text: 'OK' }]
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
    headerTitle: {
      ...typography.h3,
      color: theme.colors.text,
      fontWeight: '700',
    },
    content: {
      padding: spacing.md,
    },
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.h4,
      color: theme.colors.text,
      marginBottom: spacing.sm,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    settingLabel: {
      ...typography.body,
      color: theme.colors.text,
    },
    settingValue: {
      ...typography.body,
      color: theme.colors.textSecondary,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: spacing.sm,
    },
    userInfo: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
    },
    userIcon: {
      fontSize: 48,
      marginBottom: spacing.sm,
    },
    username: {
      ...typography.h4,
      color: theme.colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.section}>
          <View style={styles.userInfo}>
            <Text style={styles.userIcon}>👤</Text>
            <Text style={styles.username}>{user?.username || 'User'}</Text>
          </View>
        </Card>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <Card>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={showDisclaimer}
            >
              <Text style={styles.settingLabel}>Medical Disclaimer</Text>
              <Text style={styles.settingValue}>→</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingRow} onPress={showAbout}>
              <Text style={styles.settingLabel}>About</Text>
              <Text style={styles.settingValue}>→</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Version</Text>
              <Text style={styles.settingValue}>1.0.0</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

