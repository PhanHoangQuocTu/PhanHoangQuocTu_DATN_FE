import { z } from 'zod';

export const booksPageFilterSchema = z.object({
  search: z.string().trim().max(100),
  maxRating: z.string().trim().max(100),
  minRating: z.string().trim().max(100),
  maxPrice: z.string().trim().max(100),
  minPrice: z.string().trim().max(100),
  publisherId: z.string().trim().max(100),
  authorId: z.string().trim().max(100),
  categoryId: z.string().trim().max(100),
});

export type BooksPageFilterType = z.infer<typeof booksPageFilterSchema>;
