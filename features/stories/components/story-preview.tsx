import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Story } from '../types/story';

const StoryPreview = ({ title }: Pick<Story, 'title'>) => {
  return (
    <View className="w-[48%] bg-white rounded-lg p-2 mb-4 items-center">
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        className="w-full h-24 rounded-lg mb-2"
      />
      <Text className="text-sm font-bold text-center mb-2">{title}</Text>
      <TouchableOpacity className="bg-gray-200 py-2 px-4 rounded-full">
        <Text className="text-gray-700 font-bold">Read Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryPreview;
