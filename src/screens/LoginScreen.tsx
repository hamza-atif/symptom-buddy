import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, User } from '../types';
import { useTheme } from '../hooks/useTheme';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useStorage } from '../hooks/useStorage';
import { validation } from '../utils/validation';
import { generateId } from '../utils/helpers';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { saveUser } = useStorage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!validation.isNotEmpty(username)) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (!validation.isValidUsername(username)) {
      newErrors.username = 'Username must be 3-20 alphanumeric characters';
      isValid = false;
    }

    if (!validation.isNotEmpty(password)) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validation.isValidPassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user: User = {
      id: generateId(),
      username: validation.sanitizeInput(username),
      isAuthenticated: true,
    };

    await saveUser(user);
    setLoading(false);
    navigation.replace('Main');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: spacing.xl,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xxl,
    },
    icon: {
      fontSize: 90,
      marginBottom: spacing.xl,
      opacity: 0.9,
    },
    title: {
      ...typography.h1,
      color: theme.colors.text,
      marginBottom: spacing.md,
      fontWeight: '800',
    },
    subtitle: {
      ...typography.bodyLarge,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    form: {
      marginBottom: spacing.lg,
    },
    disclaimer: {
      ...typography.caption,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.lg,
      lineHeight: 18,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.icon}>🏥</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to access your health assistant
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            error={errors.username}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
          />
        </View>

        {/* <Text style={styles.disclaimer}>
          Note: This is a demo app with local authentication. In production,
          use proper authentication services like Firebase or Auth0.
        </Text> */}
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

