import { createCharacterSchema } from '@/features/characters/schemas/create-character-schema';
import { LANGUAGES } from '@/shared/stores/story-generator-store';
import { z } from 'zod';
import { STORY_TYPES } from '../components/story-type-step';

export const createStorySchema = z.object({
  characters: z.array(createCharacterSchema).min(1),
  storyType: z.enum(STORY_TYPES),
  language: z.enum(LANGUAGES),
  additionalInstructions: z.string(),
});

export const createStoryFormSchema = z.object({
  storyType: z.enum(STORY_TYPES),
  additionalInstructions: z.string(),
});

export type createStoryType = z.infer<typeof createStorySchema>;
export type createStoryTypeForm = z.infer<typeof createStoryFormSchema>;
