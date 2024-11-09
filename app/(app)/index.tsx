import { useSession } from '@/providers/session/session-provider';
import { Pressable, Text, View } from 'react-native';

export default function Index() {
  const { signOut } = useSession();

  return (
    <View className="flex-1 justify-center items-center bg-pink-500">
      <Pressable onPress={signOut} className="bg-zinc-900
       p-4 rounded-lg">
        <Text className="text-white">Sign Out</Text>
      </Pressable>
    </View>
  );
}
