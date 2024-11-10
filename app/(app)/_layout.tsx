import { useSession } from '@/providers/session/session-provider';
import { Redirect, Tabs } from 'expo-router';
import { LayoutDashboard, Library } from 'lucide-react-native';

export default function AppLayout() {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} />,
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          title: 'Stories',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Library color={color} />,
        }}
      />
    </Tabs>
  );
}
