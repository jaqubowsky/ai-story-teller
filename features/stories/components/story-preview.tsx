import { Image, Text, TouchableOpacity, View } from "react-native";
import { Story } from "../types/story";

const StoryPreview = ({ title, status }: Pick<Story, "title" | "status">) => {
  return (
    <View className="w-[48%] bg-white rounded-lg p-2 justfy-center items-center">
      <Image
        source={{
          uri: "https://placehold.co/400.png",
        }}
        style={{ height: 100 }}
        className="w-full rounded-lg mb-2 object-cover"
      />
      <Text className="text-sm font-bold text-center mb-2">{title}</Text>
      <TouchableOpacity
        disabled={status === "GENERATING"}
        className="bg-gray-200 py-2 px-4 rounded-full disabled:opacity-50"
      >
        <Text className="text-gray-700 font-bold">Read Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryPreview;
