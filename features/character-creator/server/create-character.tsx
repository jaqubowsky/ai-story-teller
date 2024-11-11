import { supabase } from '@/shared/lib/supabase';
import {
  createCharacterSchema,
  createCharacterType,
} from '../schemas/create-character-schema';

export const createCharacter = async (unsafeData: createCharacterType) => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData) {
    return { success: false, message: 'User not authenticated' };
  }

  const { success, data } = createCharacterSchema.safeParse(unsafeData);
  if (!success) {
    return {
      success: false,
      message: 'Invalid data provided. Please try again.',
    };
  }

  const { error } = await supabase
    .from('characters')
    .insert({ ...data, profile: sessionData.session?.user.id });

  return {
    success: !error,
    message: error?.message ?? 'Character created sucessfully',
  };
};
