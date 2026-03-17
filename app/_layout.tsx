import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

import Analytics from '@/components/Analytics';
import { AuthProvider } from '@/contexts/AuthContext';

const SportMateDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#ff4d4f',
    background: '#050505',
    card: '#111111',
    text: '#ffffff',
    border: '#333333',
    notification: '#ff7875',
  },
} as const;

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider value={SportMateDarkTheme}>
          <View style={styles.root}>
            <View style={styles.content}>
              <Stack screenOptions={{ headerShown: false }} />
            </View>
            <Analytics />
            <StatusBar style="light" />
          </View>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    flex: 1,
  },
});

