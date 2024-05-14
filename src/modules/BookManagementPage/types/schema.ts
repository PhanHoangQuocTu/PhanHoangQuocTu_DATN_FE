import { z } from 'zod';

import { numberRequired } from '@/lib/validations/validation.utility';

export const bookManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
  maxRating: z.string().trim().max(100),
  minRating: z.string().trim().max(100),
  maxPrice: z.string().trim().max(100),
  minPrice: z.string().trim().max(100),
  publisherId: z.string().trim().max(100),
  authorId: z.string().trim().max(100),
  categoryId: z.string().trim().max(100),
});

export const handleBookManagementSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().max(100),
  price: numberRequired,
  discount: numberRequired,
  stock: numberRequired,
  categoryId: numberRequired,
  authorId: numberRequired,
  publisherId: numberRequired,
});

export type BookManagementFilterType = z.infer<typeof bookManagementFilterSchema>;
export type HandleBookManagementType = z.infer<typeof handleBookManagementSchema>;
