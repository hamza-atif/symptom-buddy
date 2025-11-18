export const validation = {
  /**
   * Sanitizes user input to prevent injection attacks
   */
  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .substring(0, 5000); // Limit input length
  },

  /**
   * Validates if the input is not empty
   */
  isNotEmpty(input: string): boolean {
    return input.trim().length > 0;
  },

  /**
   * Validates email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validates username (alphanumeric, 3-20 characters)
   */
  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  },

  /**
   * Validates password strength
   */
  isValidPassword(password: string): boolean {
    return password.length >= 6;
  },

  /**
   * Checks if text contains potentially harmful content
   */
  containsHarmfulContent(text: string): boolean {
    const harmfulPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /<iframe/i,
    ];
    return harmfulPatterns.some(pattern => pattern.test(text));
  },
};

