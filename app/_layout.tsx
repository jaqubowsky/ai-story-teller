import '@/assets/styles/global.css';
import { SessionProvider } from '@/providers/session/session-provider';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
