import { z } from 'zod';

import { numberRequired } from '@/lib/validations/validation.utility';

export const bookDetailPageSchema = z.object({
  quantity: numberRequired,
});

export type BookDetailPageType = z.infer<typeof bookDetailPageSchema>;
