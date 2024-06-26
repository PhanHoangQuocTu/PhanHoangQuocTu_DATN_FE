import { z } from 'zod';

export const handleCommentSchema = z.object({
  content: z.string().trim(),
});

export type HandleCommentType = z.infer<typeof handleCommentSchema>;
