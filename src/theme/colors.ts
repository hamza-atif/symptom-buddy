import { ThemeColors } from '../types';

// Professional medical theme with warm, sophisticated tones
export const appColors: ThemeColors = {
  primary: '#D4A574',        // Warm tan/caramel (sophisticated, welcoming)
  secondary: '#B8956A',      // Medium brown (professional)
  background: '#FAF8F5',     // Very light cream (clean, comfortable)
  surface: '#FFFFFF',        // Pure white
  text: '#2C2C2C',           // Dark charcoal (excellent readability)
  textSecondary: '#757575',  // Medium gray
  error: '#E53935',          // Medical red
  success: '#43A047',        // Medical green
  warning: '#FB8C00',        // Amber orange
  border: '#E8E3DC',         // Light warm border
  card: '#FFFFFF',           // White cards
  userBubble: '#D4A574',     // Warm tan
  aiBubble: '#F7F5F2',       // Very light warm gray
  shadow: '#000000',
};

// Export as both for compatibility
export const lightColors = appColors;
export const darkColors = appColors;

