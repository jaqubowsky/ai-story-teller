import "@/assets/styles/global.css";
import {
  SessionProvider,
  useSession,
} from "@/providers/session/session-provider";
import Loading from "@/shared/components/loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { Text } from "react-native";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppScreens />
      </SessionProvider>
    </QueryClientProvider>
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
            <Link
              className="flex items-center justify-start gap-2 flex-row"
              href="./"
            >
              <BookOpen size={32} color="black" />
              <Text className="text-xl text-center font-bold">StoryTime</Text>
            </Link>
          ),
          headerRight: () => (
            <Link
              className="text-white bg-purple-700 rounded-full px-4 py-2"
              href="./stories"
            >
              My Stories
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="create-character-modal"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
          headerTitle: "Create Character",
        }}
      />
      <Stack.Screen
        name="create-story-modal"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom",
          headerTitle: "Create Story",
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ title: "Sign In", headerShown: false }}
      />
    </Stack>
  );
}
