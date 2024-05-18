import { z } from 'zod';

import { numberRequired } from '@/lib/validations/validation.utility';

export const updateCartPageSchema = z.object({
  quantity: numberRequired,
});

export type UpdateCartPageType = z.infer<typeof updateCartPageSchema>;
