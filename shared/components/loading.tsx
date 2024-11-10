import { BookOpen } from "lucide-react-native";
import { ActivityIndicator, Text, View } from "react-native";

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center gap-2">
      <View className="items-center justify-center gap-2 flex-row">
        <BookOpen size={32} color="black" />
        <Text className="text-xl font-bold">StoryTime</Text>
      </View>
      <ActivityIndicator size="large" color="#a855f7" />
    </View>
  );
};

export default Loading;
