import { mutationKeys } from '@/data/mutation-keys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCharacterType } from '../schemas/create-character-schema';
import { createCharacter, getCharacters } from '../server/characters';

export const useCreateCharacter = () => {
  return useMutation({
    mutationKey: [mutationKeys.CREATE_CHARACTER],
    mutationFn: async (unsafeData: createCharacterType) =>
      createCharacter(unsafeData),
  });
};

export const useGetCharacters = () => {
  return useQuery({
    queryKey: [mutationKeys.GET_CHARACTERS],
    queryFn: async () => getCharacters(),
    initialData: { data: [], message: '' },
  });
};
