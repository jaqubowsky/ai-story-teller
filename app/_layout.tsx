import { Stack } from 'expo-router';
import '../assets/styles/global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
