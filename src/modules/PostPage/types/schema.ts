import { z } from 'zod';

export const handlePostSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().max(5000),
});

export type HandlePostType = z.infer<typeof handlePostSchema>;
