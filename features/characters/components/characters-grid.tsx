import { type Character as CharacterType } from '@/shared/types/characters';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Character from './character';
import DummyCharacter from './dummy-character';

type CharactersGridProps = {
  characters: CharacterType[] | [];
  selectedChars: Pick<CharacterType, 'id'>[];
  setSelectedChars: (chars: Pick<CharacterType, 'id'>[]) => void;
};

const CharactersGrid = ({
  characters,
  setSelectedChars,
  selectedChars,
}: CharactersGridProps) => {
  const handleSelect = (id: string) => {
    if (selectedChars.some((char) => char.id === id)) {
      setSelectedChars(selectedChars.filter((char) => char.id !== id));
    } else {
      setSelectedChars([...selectedChars, { id }]);
    }
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
