import StoryPreview from '@/features/stories/components/story-preview';
import { useGetStories } from '@/features/stories/mutations/story';
import Background from '@/shared/components/background';
import { WandIcon } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import Reanimated, { FadeIn } from 'react-native-reanimated';

export default function StoriesScreen() {
  const { data, isLoading } = useGetStories();

  return (
    <Background>
      <View className="flex-row items-center mb-4 justify-center gap-2">
        <WandIcon size={32} color="white" />
        <Text className="text-3xl px-4 pt-4 font-bold text-white">
          Your Magical Stories
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 60 }}
      >
        <Reanimated.View
          className="flex-row flex-wrap justify-between gap-2"
          entering={FadeIn.duration(1000)}
        >
          {isLoading && !data.data.length ? (
            <ActivityIndicator color="#a855f7" />
          ) : null}
          {!isLoading && data.data.length
            ? data.data.map((story, index) => (
                <StoryPreview {...story} key={index} />
              ))
            : null}
        </Reanimated.View>
      </ScrollView>
    </Background>
  );
}
