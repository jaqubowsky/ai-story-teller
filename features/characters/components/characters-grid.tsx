import useStoryStore from '@/shared/stores/story-generator-store';
import { type Character as CharacterType } from '@/shared/types/characters';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Character from './character';
import DummyCharacter from './dummy-character';

type CharactersGridProps = {
  characters: CharacterType[];
};

const CharactersGrid = ({ characters }: CharactersGridProps) => {
  const { selectedChars, setSelectedChars } = useStoryStore();

  const handleSelect = (id: string) => {
    const isSelected = selectedChars.some((char) => char.id === id);
    setSelectedChars(
      isSelected
        ? selectedChars.filter((char) => char.id !== id)
        : [...selectedChars, { id }]
    );
  };

  const isActive = (id: string) =>
    selectedChars.some((char: Pick<CharacterType, 'id'>) => char.id === id);

  return (
    <View className="flex-row flex-wrap">
      {[...characters, { id: 'add', name: '' }].map((item) => (
        <View key={item.id} className="w-1/3 py-2 px-1">
          {item.id === 'add' ? (
            <DummyCharacter
              onPress={() => router.push('/create-character-modal')}
            />
          ) : (
            <Character
              {...item}
              onPress={() => handleSelect(item.id)}
              isActive={isActive(item.id)}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default CharactersGrid;
