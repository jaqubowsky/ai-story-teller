import CharactersGrid from '@/features/characters/components/characters-grid';
import { useGetCharacters } from '@/features/characters/mutations/characters';
import LanguageSelector from '@/features/stories/components/language-selector';
import Background from '@/shared/components/background';
import Button from '@/shared/components/button';
import useStoryStore from '@/shared/stores/story-generator-store';
import { Link, router } from 'expo-router';
import { BookAIcon, WandIcon } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  const { data, isLoading } = useGetCharacters();

  const { selectedChars } = useStoryStore();

  return (
    <Background>
      {!isLoading && !data.data.length && (
        <View className="h-full items-center justify-center">
          <Animated.View
            entering={FadeIn.duration(1000)}
            className="flex-col items-center justify-center"
          >
            <Text className="text-2xl font-bold text-white mb-2">
              Let's Create Magic!
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeIn.duration(1500)}
            className="flex-col items-center justify-center"
          >
            <Text className="text-lg text-white mb-4">
              Your amazing story adventure begins here!
            </Text>
          </Animated.View>

          <View className="flex-col items-center justify-center gap-2">
            <TouchableOpacity className="bg-white flex-row items-center py-3 px-6 rounded-full">
              <WandIcon size={24} color="black" />
              <Link
                className="text-black font-bold text-lg ml-2"
                href="./create-character-modal"
              >
                Create your first character
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Animated.View entering={FadeIn.duration(2000)}>
        {isLoading && !data.data.length ? (
          <ActivityIndicator color="#a855f7" />
        ) : null}
        {!isLoading && data.data.length ? (
          <View className="flex-col gap-2 ">
            <Text className="text-white text-base font-bold mb-4 ml-3">
              Select characters to start your story:
            </Text>
            <CharactersGrid characters={data.data} />
            <View className="flex-row gap-2 items-center justify-center px-10">
              <LanguageSelector
                disabled={!data.data.length || !selectedChars.length}
              />
              <Button
                icon={<BookAIcon size={24} color="white" />}
                size="small"
                onPress={() => router.push('./create-story-modal')}
                title="Start Story"
                className="self-end"
                disabled={!data.data.length || !selectedChars.length}
              />
            </View>
          </View>
        ) : null}
      </Animated.View>
    </Background>
  );
}
