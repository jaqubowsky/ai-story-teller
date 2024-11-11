import Button from '@/shared/components/button';
import { cn } from '@/shared/lib/twMerge';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCreateCharacter } from '../mutations/characters';
import {
  createCharacterSchema,
  createCharacterType,
} from '../schemas/create-character-schema';

const CharacterForm = () => {
  const {
    data: mutationData,
    mutate: createCharacter,
    error,
    isSuccess,
  } = useCreateCharacter();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(createCharacterSchema),
  });

  const onSubmit = async (data: createCharacterType) => {
    createCharacter(data);
    const alertType = isSuccess ? 'Success' : 'Error';

    if (isSuccess) {
      reset();
      router.push('..');
    }

    const message = mutationData?.message || error?.message;

    Alert.alert(alertType, message);
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-base text-white self-start mb-1">
        Character name
      </Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white p-3 rounded-md mb-4 w-full"
            placeholder="Character name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text className="text-base text-white self-start mb-1">Age</Text>
      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white p-3 rounded-md mb-4 w-full"
            placeholder="Enter age ( optional )"
            value={value ? value.toString() : ''}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />

      <Text className="text-base text-white self-start mb-1">Interests</Text>
      <Text className="text-xs text-white self-start mb-4">
        Enter what your character likes to do
      </Text>
      <Controller
        control={control}
        name="interests"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-white p-3 rounded-md mb-4 w-full"
            placeholder="Games, drawing, reading, etc."
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text className="text-base text-white self-start mb-1">Gender</Text>
      <Text className="text-xs text-white self-start mb-4">
        It will help us to generate a better story
      </Text>
      <View className="flex-row justify-between mb-4 w-full">
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                className={cn('flex-1 p-3 rounded-md', {
                  'bg-pink-500': value === 'male',
                  'bg-white': value !== 'male',
                })}
                onPress={() => onChange('male')}
              >
                <Text
                  className={cn('text-center', {
                    'text-white': value === 'male',
                    'text-black': value !== 'male',
                  })}
                >
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={cn('flex-1 p-3 rounded-md ml-2', {
                  'bg-pink-500': value === 'female',
                  'bg-white': value !== 'female',
                })}
                onPress={() => onChange('female')}
              >
                <Text
                  className={cn('text-center', {
                    'text-white': value === 'female',
                    'text-black': value !== 'female',
                  })}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>

      <Button title="Create" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CharacterForm;
