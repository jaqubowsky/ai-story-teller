import { Plus } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

type DummyCharacterProps = {
  onPress: () => void;
};

const DummyCharacter = ({ onPress }: DummyCharacterProps) => {
  return (
    <TouchableOpacity className="flex-col gap-2 items-center justify-center" onPress={onPress}>
      <View className="w-24 h-24 bg-gray-200 rounded-full justify-center items-center">
        <Plus size={48} color="#7e3ea1" />
      </View>
    </TouchableOpacity>
  );
};

export default DummyCharacter;
