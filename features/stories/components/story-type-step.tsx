import Button from '@/shared/components/button';
import { cn } from '@/shared/lib/twMerge';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStoryTypeForm } from '../schemas/create-story-schema';

export const STORY_TYPES = [
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
] as const;

type StoryTypeStepProps = {
  form: UseFormReturn<createStoryTypeForm>;
  onNext: () => void;
};

const StoryTypeStep = ({ form, onNext }: StoryTypeStepProps) => {
  const { control } = form;

  return (
    <View className="flex-col gap-4">
      <Text className="text-white text-base font-bold mb-4 ml-3">
        Choose a story type:
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {STORY_TYPES.map((type) => (
          <Controller
            key={type}
            control={control}
            name="storyType"
            render={({ field: { onChange } }) => (
              <TouchableOpacity
                onPress={() => {
                  onChange(type);
                }}
                className={cn('bg-white py-2 px-4 rounded-full', {
                  'bg-purple-500': form.getValues('storyType') === type,
                })}
              >
                <Text
                  className={cn('text-black font-bold text-lg', {
                    'text-white': form.getValues('storyType') === type,
                  })}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            )}
          />
        ))}
      </View>
      <Button
        onPress={onNext}
        title="Next"
        disabled={form.formState.isSubmitting}
      />
    </View>
  );
};

export default StoryTypeStep;
