import { useSession } from '@/providers/session/session-provider';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, Tabs } from 'expo-router';
import { LayoutDashboard, Library } from 'lucide-react-native';

export default function AppLayout() {
  const { isLoading, isLoggedIn } = useSession();

  if (isLoading) return <LinearGradient colors={['#a855f7', '#ec4899']} />;
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
