import { cn } from '@/shared/lib/twMerge';
import { type Character as CharacterType } from '@/shared/types/characters';
import { User } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type CharacterProps = Pick<CharacterType, 'name'> & {
  isActive: boolean;
  onPress: () => void;
};

const Character = ({ name, isActive, onPress }: CharacterProps) => {
  return (
    <TouchableOpacity
      className={cn(
        'flex-col gap-2 items-center justify-center p-1 rounded-md',
        isActive ? 'border border-purple-500 bg-purple-500/15' : 'border-none'
      )}
      onPress={onPress}
    >
      <View className="w-24 h-24 bg-gray-200 rounded-full justify-center items-center">
        <User size={48} color="#7e3ea1" />
      </View>
      <Text className="text-white">{name}</Text>
    </TouchableOpacity>
  );
};

export default Character;
