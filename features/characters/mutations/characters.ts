import { mutationKeys } from '@/data/mutation-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCharacterType } from '../schemas/create-character-schema';
import { createCharacter, getCharacters } from '../server/characters';

export const useCreateCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.CREATE_CHARACTER],
    mutationFn: async (unsafeData: createCharacterType) =>
      await createCharacter(unsafeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [mutationKeys.GET_CHARACTERS],
      });
    },
  });
};

export const useGetCharacters = () => {
  return useQuery({
    queryKey: [mutationKeys.GET_CHARACTERS],
    queryFn: async () => getCharacters(),
    initialData: { data: [], message: '' },
  });
};
