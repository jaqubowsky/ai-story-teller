import '@/assets/styles/global.css';
import {
  SessionProvider,
  useSession,
} from '@/providers/session/session-provider';
import Loading from '@/shared/components/loading';
import { Link, Stack } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

export default function RootLayout() {
  return (
    <SessionProvider>
      <AppScreens />
    </SessionProvider>
  );
}

function AppScreens() {
  const { isLoading } = useSession();

  if (isLoading) return <Loading />;

  return (
    <Stack>
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: isLoading ? false : true,
          headerTitle: () => (
            <View className="items-center justify-center gap-2 flex-row">
              <BookOpen size={32} color="black" />
              <Text className="text-xl font-bold">StoryTime</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Link
                className="text-white bg-purple-700 rounded-full px-4 py-2"
                href="./stories"
              >
                My Stories
              </Link>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="create-character-modal"
        options={{
          presentation: 'modal',
          animation: 'fade_from_bottom',
          headerTitle: 'Create Character',
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ title: 'Sign In', headerShown: false }}
      />
    </Stack>
  );
}
