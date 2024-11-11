import { z } from 'zod';

export const createCharacterSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().int().optional(),
  interests: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
});

export type createCharacterType = z.infer<typeof createCharacterSchema>;
