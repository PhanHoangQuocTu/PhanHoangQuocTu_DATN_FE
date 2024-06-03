import { z } from 'zod';

import { validationMessages } from '@/lib/validations/validation.utility';

export const handlePostSchema = z.object({
  title: z.string().min(1, validationMessages.required()).trim().max(100),
  description: z.string().min(1, validationMessages.required()).trim().max(5000),
});

export type HandlePostType = z.infer<typeof handlePostSchema>;
