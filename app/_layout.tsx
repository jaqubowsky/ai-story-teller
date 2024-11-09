import '@/assets/styles/global.css';
import { SessionProvider } from '@/providers/session/session-provider';
import { Link, Stack } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen
          name="(app)"
          options={{
            headerTitle: () => {
              return (
                <View className="items-center justify-center gap-2 flex-row">
                  <BookOpen size={32} color="black" />
                  <Text className="text-xl font-bold">StoryTime</Text>
                </View>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity>
                  <Link
                    className="text-white bg-purple-700 rounded-full px-4 py-2"
                    href="./stories"
                  >
                    My Stories
                  </Link>
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{ title: 'Sign In', headerShown: false }}
        />
      </Stack>
    </SessionProvider>
  );
}
