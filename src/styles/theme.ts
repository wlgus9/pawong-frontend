import { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  primary: '#007AFF', // 메인 파란색
  secondary: '#5856D6',
  text: '#000000',
  textSecondary: '#8E8E93',
  white: '#FFFFFF',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  kakao: '#FEE500',
  naver: '#03C75A',
  google: '#FFFFFF',
  background: '#FFFFFF',
  surface: '#F2F2F7',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
  },
};

export const commonStyles: Record<string, ViewStyle | TextStyle> = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: spacing.md,
    fontSize: typography.body.fontSize,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: '700',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
}; 