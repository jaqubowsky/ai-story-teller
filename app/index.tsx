import Auth from '@/components/Auth';
import { StatusBar, Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Auth />
      <StatusBar />
    </View>
  );
}
