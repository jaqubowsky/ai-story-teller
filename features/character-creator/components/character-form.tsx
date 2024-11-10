import Button from '@/shared/components/button';
import { cn } from '@/shared/lib/twMerge';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const CharacterForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [gender, setGender] = useState('');

  const handleSave = () => {
    console.log({ name, age, interests, gender });
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-base text-white self-start mb-1">
        Character name
      </Text>
      <TextInput
        className="bg-white p-3 rounded-md mb-4 w-full"
        placeholder="Character name"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-base text-white self-start mb-1">Age</Text>

      <TextInput
        className="bg-white p-3 rounded-md mb-4 w-full"
        placeholder="Enter age ( optional )"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text className="text-base text-white self-start mb-1">Interests</Text>
      <Text className="text-xs text-white self-start mb-4">
        Enter what your character likes to do
      </Text>

      <TextInput
        className="bg-white p-3 rounded-md mb-4 w-full"
        placeholder="Games, drawing, reading, etc."
        value={interests}
        onChangeText={setInterests}
      />

      <Text className="text-base text-white self-start mb-1">Gender</Text>
      <Text className="text-xs text-white self-start mb-4">
        It will help us to generate a better story
      </Text>

      <View className="flex-row justify-between mb-4 w-full">
        <TouchableOpacity
          className={cn('flex-1 p-3 rounded-md', {
            'bg-pink-500': gender === 'male',
            'bg-white': gender !== 'male',
          })}
          onPress={() => setGender('male')}
        >
          <Text
            className={cn('text-center', {
              'text-white': gender === 'male',
              'text-black': gender !== 'male',
            })}
          >
            Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={cn('flex-1 p-3 rounded-md ml-2', {
            'bg-pink-500': gender === 'female',
            'bg-white': gender !== 'female',
          })}
          onPress={() => setGender('female')}
        >
          <Text
            className={cn('text-center', {
              'text-white': gender === 'female',
              'text-black': gender !== 'female',
            })}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default CharacterForm;
