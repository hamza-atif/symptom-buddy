import { Theme } from '../types';
import { appColors } from '../theme/colors';

export const useTheme = () => {
  const theme: Theme = {
    colors: appColors,
    isDark: false, // Always light/brownish theme
  };

  // No-op function for compatibility
  const toggleTheme = () => {};

  return { theme, toggleTheme };
};

