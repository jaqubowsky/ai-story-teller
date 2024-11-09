import { useSession } from '@/providers/session/session-provider';
import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

export default function AppLayout() {
  const { isLoading, isLoggedIn } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return <Stack />;
}
