import Button from '@/shared/components/button';
import { cn } from '@/shared/lib/twMerge';
import useStoryStore from '@/shared/stores/story-generator-store';
import { Text, TouchableOpacity, View } from 'react-native';

const STORY_TYPES = [
  'Adventure',
  'Fantasy',
  'Fairy Tale',
  'Mythology',
  'Comedy',
  'Animal Stories',
  'Superhero',
  'Magic',
  'Friendship',
  'Mystery',
  'Science Fiction',
  'Historical',
  'Sports',
  'Pirate',
  'Space',
];

type StoryTypeStepProps = {
  onNext: (type: string) => void;
};

const StoryTypeStep = ({ onNext }: StoryTypeStepProps) => {
  const { selectedType, setSelectedType } = useStoryStore();

  return (
    <View className="flex-col gap-4">
      <Text className="text-white text-base font-bold mb-4 ml-3">
        Choose a story type:
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {STORY_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            className={cn('bg-white py-2 px-4 rounded-full', {
              'bg-purple-500': selectedType === type,
            })}
          >
            <Text
              className={cn('text-black font-bold text-lg', {
                'text-white': selectedType === type,
              })}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        onPress={() => onNext(selectedType)}
        title="Next"
        disabled={!selectedType}
      />
    </View>
  );
};

export default StoryTypeStep;
