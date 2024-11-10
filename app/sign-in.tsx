import Auth from '@/features/auth';
import { useSession } from '@/providers/session/session-provider';
import { Redirect } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function SignIn() {
  const { isLoggedIn } = useSession();

  if (isLoggedIn) return <Redirect href="/" />;

  return (
    <View className="flex-1 justify-center items-center bg-pink-500">
      <View className="flex gap-3 flex-col items-center justify-center">
        <BookOpen size={48} color="white" />
        <Text className="text-4xl font-bold text-white">StoryTime</Text>
        <Text className="text-lg text-white">
          Where imagination comes to life!
        </Text>
      </View>
      <Auth />
    </View>
  );
}
