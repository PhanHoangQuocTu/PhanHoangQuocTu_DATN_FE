import { z } from 'zod';

export const handleCommentSchema = z.object({
  content: z.string().trim().max(5000),
});

export type HandleCommentType = z.infer<typeof handleCommentSchema>;
