import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { OnboardingSlide as SlideType } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface OnboardingSlideProps {
  slide: SlideType;
}

const { width } = Dimensions.get('window');

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ slide }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    image: {
      fontSize: 100,
      marginBottom: spacing.xxl,
    },
    title: {
      ...typography.h2,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: spacing.lg,
      fontWeight: '700',
    },
    description: {
      ...typography.bodyLarge,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 26,
      paddingHorizontal: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.image}>{slide.image}</Text>
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.description}>{slide.description}</Text>
    </View>
  );
};

