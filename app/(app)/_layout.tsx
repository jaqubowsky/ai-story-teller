import { useSession } from '@/providers/session/session-provider';
import { Redirect, Tabs } from 'expo-router';
import { Library, LogOutIcon } from 'lucide-react-native';
import { Text } from 'react-native';

export default function AppLayout() {
  const { isLoading, isLoggedIn, signOut } = useSession();

  if (isLoading) return <Text>Loading...</Text>;
  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerRight: () => (
          <LogOutIcon onPress={signOut} size={24} color="black" />
        ),
        headerRightContainerStyle: {
          paddingStart: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Library color={color} />,
        }}
      />
    </Tabs>
  );
}
