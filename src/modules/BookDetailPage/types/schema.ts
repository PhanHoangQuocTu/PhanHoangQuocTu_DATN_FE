import { z } from 'zod';

import { numberRequired } from '@/lib/validations/validation.utility';

export const bookDetailPageSchema = z.object({
  quantity: numberRequired,
});

export const createBookReviewSchema = z.object({
  ratings: z.string(),
  comment: z.string().max(500, "Comment can't be more than 500 characters"),
});

export type BookDetailPageType = z.infer<typeof bookDetailPageSchema>;
export type CreateBookReviewType = z.infer<typeof createBookReviewSchema>;
