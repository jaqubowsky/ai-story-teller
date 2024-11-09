import Auth from '@/components/Auth';
import { BookOpen } from 'lucide-react-native';
import { StatusBar, Text, View } from 'react-native';

export default function Index() {
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
      <StatusBar barStyle="light-content" />
    </View>
  );
}
