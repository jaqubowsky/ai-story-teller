import { z } from "zod";

export const deleteStorySchema = z.string().uuid();
