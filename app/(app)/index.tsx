import CharactersGrid from '@/features/characters/components/characters-grid';
import { useGetCharacters } from '@/features/characters/mutations/characters';
import Background from '@/shared/components/background';
import Button from '@/shared/components/button';
import { Character } from '@/shared/types/characters';
import { Link } from 'expo-router';
import { CircleDollarSign, WandIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  const [selectedChars, setSelectedChars] = useState<Pick<Character, 'id'>[]>(
    []
  );

  const { data = { data: [] }, isLoading } = useGetCharacters();

  return (
    <Background>
      {!isLoading && !data.data.length && (
        <>
          <Animated.View entering={FadeIn.duration(1000)}>
            <Text className="text-2xl font-bold text-white mb-2">
              Let's Create Magic!
            </Text>
          </Animated.View>
          <Animated.View entering={FadeIn.duration(1500)}>
            <Text className="text-lg text-white mb-4">
              Your amazing story adventure begins here!
            </Text>
          </Animated.View>
        </>
      )}
      <Animated.View entering={FadeIn.duration(2000)}>
        {isLoading ? <ActivityIndicator color="#a855f7" /> : null}
        {!isLoading && !data.data.length ? (
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
        ) : (
          <View className="flex-col gap-2 ">
            <Text className="text-white text-base font-bold mb-4 ml-3">
              Select characters to start your story:
            </Text>
            <CharactersGrid characters={data.data} selectedChars={selectedChars} setSelectedChars={setSelectedChars}/>
            <Button
              icon={<CircleDollarSign size={24} color="white" />}
              size="small"
              onPress={() => {}}
              title="Start Story"
              className="self-end"
              disabled={!data.data.length}
            />
          </View>
        )}
      </Animated.View>
    </Background>
  );
}
