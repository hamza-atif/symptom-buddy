# Contributing to Symptom Buddy

First off, thank you for considering contributing to Symptom Buddy! It's people like you that make this project better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Device: [e.g. iPhone 12, Samsung Galaxy S21]
 - OS: [e.g. iOS 15.0, Android 12]
 - App Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Features

Feature suggestions are welcome! Please provide:

1. **Clear description** of the feature
2. **Use case** - Why is this feature needed?
3. **Proposed solution** - How should it work?
4. **Alternatives** - Other solutions you've considered

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request.
```

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- `good-first-issue` - Issues suitable for beginners
- `help-wanted` - Issues that need assistance

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS/Android development environment

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/symptom-buddy.git
   cd symptom-buddy
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/symptom-buddy.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create .env file**
   ```bash
   cp .env.example .env
   # Add your Gemini API key
   ```

6. **Start development server**
   ```bash
   npm start
   ```

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of your own code
- [ ] Commented code in hard-to-understand areas
- [ ] Documentation updated (if applicable)
- [ ] No new warnings or errors
- [ ] Tests pass (if applicable)

### Submitting a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   ```bash
   # Code your feature
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

4. **Keep your fork updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template
   - Submit!

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on iOS/Android
```

## Style Guidelines

### TypeScript Code Style

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// ❌ Bad
interface user {
  id:string
  name:string
}

function fetchUser(userId) {
  return api.get('/users/' + userId)
}
```

### Component Structure

```typescript
// ✅ Good: Functional component with types
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

### File Naming

- **Components**: PascalCase - `Button.tsx`, `UserProfile.tsx`
- **Utilities**: camelCase - `validation.ts`, `helpers.ts`
- **Constants**: UPPER_SNAKE_CASE - `API_CONFIG`, `STORAGE_KEYS`
- **Hooks**: camelCase with 'use' prefix - `useTheme.ts`, `useAuth.ts`

### Code Organization

```typescript
// Import order:
// 1. React/React Native
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';

// 3. Project imports
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme';

// 4. Types
import type { User } from '@/types';
```

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
feat(auth): add biometric login support
fix(chat): resolve message ordering issue
docs(readme): update installation instructions
style(button): improve button styling
refactor(api): simplify error handling
test(storage): add AsyncStorage tests
chore(deps): update dependencies

# Bad commit messages
fix bug
update code
changes
WIP
```

### Detailed Example

```
feat(chat): add message reactions feature

- Add reaction picker component
- Implement reaction storage logic
- Update message bubble to show reactions
- Add unit tests for reaction functionality

Closes #123
```

## Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Documentation

### Code Comments

```typescript
/**
 * Sanitizes user input to prevent injection attacks
 * 
 * @param input - The raw user input string
 * @returns Sanitized string safe for display/storage
 * 
 * @example
 * ```typescript
 * const safe = sanitizeInput("<script>alert('xss')</script>");
 * // Returns: "alert('xss')"
 * ```
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '').substring(0, 5000);
};
```

### README Updates

When adding new features, update:
- Feature list
- Usage examples
- Configuration options
- Screenshots (if UI changes)

## Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs via GitHub Issues
- 📧 **Email**: Contact maintainers directly for sensitive matters

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Symptom Buddy! 🎉

