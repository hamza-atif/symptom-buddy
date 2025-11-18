<div align="center">

# 🏥 Symptom Buddy

### AI-Powered Medical Assistant Mobile Application

[![React Native](https://img.shields.io/badge/React%20Native-v0.73-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.3-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-v50-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<p align="center">
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey" alt="Platform">
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-orange" alt="AI">
</p>

**A production-ready medical assistant that helps users understand their symptoms through AI-powered conversations**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Medical Disclaimer](#-medical-disclaimer)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**Symptom Buddy** is a sophisticated mobile application that leverages Google's Gemini AI to provide users with preliminary medical insights based on their symptoms. Built with React Native and TypeScript, it offers a seamless, cross-platform experience for both iOS and Android users.

### 🌟 Why Symptom Buddy?

- **Instant Insights**: Get immediate AI-powered responses to your health questions
- **Privacy First**: All data stored locally on your device
- **User-Friendly**: Intuitive chat interface with natural language processing
- **Always Available**: 24/7 access to medical information
- **Educational**: Helps users understand their symptoms better

> ⚠️ **Important**: This app is for educational purposes only and should not replace professional medical advice.

---

## ✨ Features

### Core Functionality

- 🤖 **AI-Powered Analysis**
  - Real-time symptom analysis using Google Gemini 2.5 Flash
  - Natural language understanding
  - Context-aware medical responses
  - Medical summary generation

- 💬 **Intelligent Chat Interface**
  - Clean, modern chat UI
  - Message history persistence
  - Typing indicators
  - Timestamp tracking

- 📚 **Consultation History**
  - Save all past consultations
  - Search through previous chats
  - Delete individual sessions
  - Export chat history

- 🎨 **Beautiful Design**
  - Professional medical theme
  - Warm, sophisticated color palette
  - Smooth animations
  - iOS-optimized safe areas

### User Experience

- 🚀 **Smooth Onboarding**
  - Interactive tutorial slides
  - Skip option for returning users
  - First-time setup guide

- 🔐 **Secure Authentication**
  - Local authentication (demo mode)
  - Ready for Firebase/Auth0 integration
  - Session management

- 💾 **Offline Storage**
  - Local data persistence with AsyncStorage
  - Works without internet (for history)
  - No cloud dependency required

- ⚙️ **Customizable Settings**
  - User profile management
  - App preferences
  - Medical disclaimer access
  - About information

---

## 📱 Screenshots

<div align="center">

| Splash Screen | Onboarding | Login |
|:---:|:---:|:---:|
| *Coming Soon* | *Coming Soon* | *Coming Soon* |

| Home Chat | History | Settings |
|:---:|:---:|:---:|
| *Coming Soon* | *Coming Soon* | *Coming Soon* |

</div>

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.73.2 | Mobile framework |
| **TypeScript** | 5.3.3 | Type safety & developer experience |
| **Expo** | ~50.0.6 | Development & build platform |
| **React Navigation** | 6.x | Navigation & routing |

### AI & APIs

| Service | Purpose |
|---------|---------|
| **Google Gemini AI** | Natural language processing & medical insights |
| **@google/generative-ai** | Official Gemini SDK integration |

### State Management & Storage

| Technology | Purpose |
|------------|---------|
| **React Hooks** | State management |
| **AsyncStorage** | Local data persistence |
| **Custom Hooks** | Reusable logic patterns |

### UI & Design

| Tool/Library | Purpose |
|--------------|---------|
| **Custom Design System** | Consistent theming |
| **react-native-safe-area-context** | iOS safe area handling |
| **Custom Components** | Reusable UI elements |

---

## 🏗 Architecture

### Project Structure

```
symptom-buddy/
├── 📁 src/
│   ├── 📁 api/                    # API service layer
│   │   └── gemini.ts              # Gemini AI integration
│   │
│   ├── 📁 components/             # Reusable UI components
│   │   ├── chat/                  # Chat-specific components
│   │   │   ├── ChatBubble.tsx
│   │   │   └── ChatList.tsx
│   │   ├── common/                # Common UI elements
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   └── onboarding/            # Onboarding components
│   │       └── OnboardingSlide.tsx
│   │
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── useTheme.ts            # Theme management
│   │   ├── useStorage.ts          # AsyncStorage wrapper
│   │   └── useGemini.ts           # Gemini AI integration
│   │
│   ├── 📁 navigation/             # Navigation configuration
│   │   └── AppNavigator.tsx       # Stack & Tab navigators
│   │
│   ├── 📁 screens/                # App screens
│   │   ├── SplashScreen.tsx       # Loading screen
│   │   ├── OnboardingScreen.tsx   # First-time tutorial
│   │   ├── LoginScreen.tsx        # Authentication
│   │   ├── HomeScreen.tsx         # Main chat interface
│   │   ├── HistoryScreen.tsx      # Past consultations
│   │   └── SettingsScreen.tsx     # App settings
│   │
│   ├── 📁 theme/                  # Design system
│   │   ├── colors.ts              # Color palette
│   │   ├── spacing.ts             # Spacing & shadows
│   │   └── typography.ts          # Text styles
│   │
│   ├── 📁 types/                  # TypeScript definitions
│   │   ├── index.ts               # Type interfaces
│   │   └── env.d.ts               # Environment types
│   │
│   ├── 📁 utils/                  # Utility functions
│   │   ├── storage.ts             # Storage helpers
│   │   ├── validation.ts          # Input validation
│   │   └── helpers.ts             # General utilities
│   │
│   └── 📁 constants/              # App constants
│       └── index.ts               # Configuration constants
│
├── 📄 App.tsx                     # Main app component
├── 📄 index.js                    # Entry point
├── 📄 package.json                # Dependencies
├── 📄 tsconfig.json               # TypeScript config
├── 📄 babel.config.js             # Babel configuration
├── 📄 app.json                    # Expo configuration
└── 📄 README.md                   # This file
```

### Design Patterns

- **Component-Based Architecture**: Modular, reusable components
- **Custom Hooks Pattern**: Encapsulated logic with reusability
- **Service Layer**: Separated API logic from UI
- **Type-Safe**: Full TypeScript integration
- **Atomic Design**: Consistent component hierarchy

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Will be installed with dependencies
- **iOS Development** (macOS only):
  - Xcode (latest version)
  - iOS Simulator
- **Android Development**:
  - Android Studio
  - Android SDK
  - Android Emulator or physical device

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/symptom-buddy.git
cd symptom-buddy
```

2. **Install dependencies**

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> 📝 Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**

```bash
npm start
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Required: Your Google Gemini AI API Key
GEMINI_API_KEY=your_api_key_here
```

### Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env` file

> ⚠️ **Security**: Never commit your `.env` file or expose your API key in code!

---

## 🚀 Usage

### Running on iOS

```bash
# Using npm
npm run ios

# Using yarn
yarn ios

# Or from Expo CLI
npx expo start
# Then press 'i'
```

**Requirements:**
- macOS operating system
- Xcode installed
- iOS Simulator configured

### Running on Android

```bash
# Using npm
npm run android

# Using yarn
yarn android

# Or from Expo CLI
npx expo start
# Then press 'a'
```

**Requirements:**
- Android Studio installed
- Android SDK configured
- Emulator running or device connected via ADB

### Running on Physical Device

1. Install **Expo Go** from:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
```bash
npm start
```

3. Scan the QR code:
   - **iOS**: Use Camera app
   - **Android**: Use Expo Go app

### Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run type checking
npm run type-check

# Run linter
npm run lint

# Clear cache and restart
npm start -- --clear
```

---

## 🔒 Security

### Input Validation

- ✅ All user inputs are sanitized
- ✅ Maximum input length limits
- ✅ HTML/script tag filtering
- ✅ Harmful content detection

### Data Protection

- ✅ API keys stored in environment variables
- ✅ Local data encryption (AsyncStorage)
- ✅ No cloud storage by default
- ✅ User data never shared with third parties

### Best Practices

- ✅ HTTPS-only API communications
- ✅ No hardcoded secrets
- ✅ Input validation on all forms
- ✅ Error handling without exposing sensitive data
- ✅ Secure authentication ready (Firebase/Auth0)

---

## 🚨 Medical Disclaimer

### ⚠️ IMPORTANT NOTICE

**This application provides general health information powered by AI and is NOT a substitute for professional medical advice, diagnosis, or treatment.**

### Legal Disclaimers

- **No Doctor-Patient Relationship**: Use of this app does not create a doctor-patient relationship
- **Not Emergency Services**: In case of medical emergency, call emergency services immediately
- **Educational Purpose Only**: Information provided is for educational purposes only
- **Consult Professionals**: Always seek advice from qualified healthcare providers
- **No Liability**: Developers assume no liability for medical decisions based on app information

### When to Seek Professional Help

⚠️ **Seek immediate medical attention if you experience:**
- Chest pain or pressure
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Severe allergic reactions
- Sudden severe pain

📞 **Emergency Numbers:**
- USA: 911
- UK: 999
- EU: 112

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Run tests (when available)
npm test
```

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help create a welcoming environment

---

## 🎯 Roadmap

### Planned Features

- [ ] **Authentication**
  - [ ] Firebase Authentication integration
  - [ ] Biometric login (Face ID / Touch ID)
  - [ ] Social media login options

- [ ] **Enhanced Features**
  - [ ] Voice input for symptoms
  - [ ] Multi-language support
  - [ ] Medication reminder system
  - [ ] Health tracking dashboard
  - [ ] Integration with health devices (Apple Health, Google Fit)

- [ ] **AI Improvements**
  - [ ] Image analysis for visible symptoms
  - [ ] Symptom prediction models
  - [ ] Follow-up question suggestions
  - [ ] Personalized health insights

- [ ] **Social Features**
  - [ ] Doctor appointment booking
  - [ ] Telemedicine integration
  - [ ] Share reports with doctors
  - [ ] Emergency contact alerts

- [ ] **Data & Analytics**
  - [ ] Export medical reports (PDF)
  - [ ] Health trends visualization
  - [ ] Symptom tracking over time
  - [ ] Anonymous health statistics

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Symptom Buddy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 Contact

### Project Links

- **GitHub Repository**: [symptom-buddy](https://github.com/hamza-atif/symptom-buddy)
- **Issue Tracker**: [Report Issues](https://github.com/hamza-atif/symptom-buddy/issues)
- **Discussions**: [Join Discussions](https://github.com/hamza-atif/symptom-buddy/discussions)

### Author

**Your Name**
- GitHub: https://github.com/hamza-atif
- Email: hamza.atif.1121@gmail.com
- LinkedIn: https://pk.linkedin.com/in/hamza-atif-553b86290

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing powerful AI capabilities
- **React Native Community** - For excellent libraries and support
- **Expo Team** - For making mobile development easier
- **Contributors** - For their valuable contributions

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/symptom-buddy?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/symptom-buddy?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/symptom-buddy)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/symptom-buddy)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with ❤️ using React Native, TypeScript, and Google Gemini AI**

[Back to Top](#-symptom-buddy)

</div>
