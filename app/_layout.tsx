import '@/assets/styles/global.css';
import { SessionProvider } from '@/providers/session/session-provider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen
          name="(app)"
          options={{ title: 'Dashboard', headerShown: false }}
        />
        <Stack.Screen
          name="sign-in"
          options={{ title: 'Sign In', headerShown: false }}
        />
      </Stack>
    </SessionProvider>
  );
}
