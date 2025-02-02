import { z } from "zod";

export const retryStorySchema = z.string().uuid();
