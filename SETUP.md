# Setup Guide - Symptom Buddy

Complete step-by-step guide to get Symptom Buddy running on your machine.

## Prerequisites Installation

### 1. Install Node.js

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version  # Should be v16 or higher
npm --version
```

**Windows:**
- Download from [nodejs.org](https://nodejs.org/)
- Install the LTS version
- Verify in Command Prompt: `node --version`

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
```

### 2. Install Expo CLI

```bash
npm install -g expo-cli
```

### 3. Install Development Tools

**For iOS Development (macOS only):**
1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Open Xcode and accept the license agreement
4. Install iOS Simulator

**For Android Development:**
1. Download [Android Studio](https://developer.android.com/studio)
2. Install Android Studio
3. During installation, ensure these are checked:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
4. Configure Android SDK:
   - Open Android Studio
   - Go to Preferences → Appearance & Behavior → System Settings → Android SDK
   - Install Android 13 (API level 33) or higher
5. Set up environment variables:

   **macOS/Linux:**
   Add to `~/.zshrc` or `~/.bashrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

   **Windows:**
   Add to System Environment Variables:
   ```
   ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
   ```

## Project Setup

### Step 1: Navigate to Project
```bash
cd /Users/hamzaatif/Documents/Personal/Symptom-Buddy/symptom-buddy
```

### Step 2: Install Dependencies
```bash
npm install
```

If you encounter any errors, try:
```bash
npm install --legacy-peer-deps
```

### Step 3: Configure Gemini API Key

1. **Get API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Configure .env file:**
   ```bash
   # The .env file is already created, just edit it
   # Open .env and replace the placeholder
   GEMINI_API_KEY=your_actual_api_key_here
   ```

   **Example:**
   ```
   GEMINI_API_KEY= *****************************
   ```

### Step 4: Start Development Server
```bash
npm start
```

This will start Expo and show you options to:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan QR code with Expo Go app (mobile)

## Running the App

### Option 1: iOS Simulator (macOS only)

1. Start the project:
   ```bash
   npm run ios
   ```

2. Or from Expo:
   ```bash
   npm start
   # Then press 'i'
   ```

3. The iOS Simulator will launch automatically

### Option 2: Android Emulator

1. Start an Android emulator:
   - Open Android Studio
   - Go to AVD Manager (Device Manager)
   - Create a new virtual device if needed
   - Click the Play button to start it

2. Start the project:
   ```bash
   npm run android
   ```

3. Or from Expo:
   ```bash
   npm start
   # Then press 'a'
   ```

### Option 3: Physical Device

1. Install **Expo Go** app:
   - iOS: Download from App Store
   - Android: Download from Play Store

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code:
   - iOS: Use Camera app
   - Android: Use Expo Go app

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

#### 2. "Metro bundler issues"
```bash
# Clear Metro cache
npm start -- --clear
```

#### 3. iOS build fails
```bash
# Clean iOS build
cd ios
pod install
cd ..
npm run ios
```

#### 4. Android build fails
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

#### 5. "GEMINI_API_KEY not found"
- Ensure `.env` file exists in root directory
- Check that the API key is correctly formatted
- Restart the development server after editing `.env`

#### 6. TypeScript errors
```bash
# Check for type errors
npm run type-check
```

#### 7. Module resolution issues
- Ensure babel.config.js has module-resolver plugin configured
- Restart Metro bundler after config changes

### Environment-Specific Issues

**macOS:**
- Ensure Xcode is up to date
- Accept Xcode license: `sudo xcodebuild -license accept`
- Check iOS Simulator is installed

**Windows:**
- Run Command Prompt or PowerShell as Administrator
- Check Android SDK is properly configured
- Ensure environment variables are set

**Linux:**
- Install required libraries: `sudo apt-get install libpangocairo-1.0-0`
- Check Android SDK permissions

## Development Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web (testing only)
npm run web

# Type check
npm run type-check

# Lint code
npm run lint

# Clear cache
npm start -- --clear
```

## Testing the App

### 1. Test Onboarding
- First launch shows onboarding slides
- Can skip or go through all slides

### 2. Test Login
- Enter any username (3-20 characters)
- Enter any password (6+ characters)
- Login is stored locally

### 3. Test Chat
- Describe symptoms in the input
- Should receive AI response
- Messages should appear in chat bubbles

### 4. Test History
- Navigate to History tab
- Should see saved consultations
- Can delete individual sessions

### 5. Test Settings
- Toggle dark mode
- View medical disclaimer
- Logout functionality

### 6. Test Theme
- Dark mode should persist
- UI should adapt to theme

## Production Build

### iOS

```bash
# Build for iOS
eas build --platform ios

# Or using Expo
expo build:ios
```

### Android

```bash
# Build for Android
eas build --platform android

# Or using Expo
expo build:android
```

## Next Steps

1. ✅ Install all prerequisites
2. ✅ Install project dependencies
3. ✅ Configure Gemini API key
4. ✅ Start development server
5. ✅ Test on simulator/emulator
6. ✅ Test all features
7. ✅ Customize as needed

## Support

If you encounter issues:
1. Check error logs in terminal
2. Verify API key is correct
3. Ensure all dependencies are installed
4. Try clearing cache and rebuilding
5. Check React Native documentation

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Gemini AI Docs](https://ai.google.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

**Happy coding! 🚀**

