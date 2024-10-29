import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../services/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';
import { CartProvider } from '@/context/CartContext';

SplashScreen.preventAutoHideAsync();

function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted) {
    return null;
  }

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
      ) : (
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthenticatedLayout />
          <Toast />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
