import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../hooks/useTheme';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const checkOnboarding = async () => {
      // Wait for splash animation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if onboarding is completed
      const onboardingCompleted = await storage.get<boolean>(
        STORAGE_KEYS.ONBOARDING_COMPLETED
      );

      // Check if user is logged in
      const user = await storage.get(STORAGE_KEYS.USER);

      if (!onboardingCompleted) {
        navigation.replace('Onboarding');
      } else if (!user) {
        navigation.replace('Login');
      } else {
        navigation.replace('Main');
      }
    };

    checkOnboarding();
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
    },
    icon: {
      fontSize: 100,
      marginBottom: spacing.xl,
    },
    title: {
      ...typography.h1,
      color: theme.colors.background,
      fontWeight: '800',
      fontSize: 38,
      letterSpacing: -0.5,
    },
    subtitle: {
      ...typography.bodyLarge,
      color: theme.colors.background,
      marginTop: spacing.md,
      opacity: 0.95,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.icon}>🏥</Text>
      <Text style={styles.title}>Symptom Buddy</Text>
      <Text style={styles.subtitle}>Your AI Health Assistant</Text>
    </SafeAreaView>
  );
};

