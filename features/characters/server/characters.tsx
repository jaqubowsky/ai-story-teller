import { Character } from '@/shared/types/characters';
import { supabase } from '@/supabase';
import {
  createCharacterSchema,
  createCharacterType,
} from '../schemas/create-character-schema';

export const createCharacter = async (unsafeData: createCharacterType) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error('User not authenticated');

  const { success, data } = createCharacterSchema.safeParse(unsafeData);
  if (!success) throw new Error('Invalid data provided. Please try again.');

  const { error } = await supabase
    .from('characters')
    .insert({ ...data, profile: sessionData.session?.user.id });

  if (error) throw new Error('Error creating character');

  return {
    message: 'Character created successfully',
  };
};

export const getCharacters = async (): Promise<{
  data: Character[] | [];
  message: string;
}> => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error('User not authenticated');

  const { data, error } = await supabase.from('characters').select('*');
  if (error) throw new Error('Error fetching characters');

  return {
    data,
    message: 'Characters fetched successfully',
  };
};
