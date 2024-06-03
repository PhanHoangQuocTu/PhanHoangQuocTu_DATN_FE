import { z } from 'zod';

import { validationMessages } from '@/lib/validations/validation.utility';

export const handlePostSchema = z.object({
  title: z.string().min(1, validationMessages.required()).trim().max(100),
  description: z.string().min(1, validationMessages.required()).trim().max(5000),
});

export const postFilterSchema = z.object({
  search: z.string().trim().max(100),
  isApprove: z.string().optional(),
});

export type PostFilterType = z.infer<typeof postFilterSchema>;
export type HandlePostType = z.infer<typeof handlePostSchema>;
