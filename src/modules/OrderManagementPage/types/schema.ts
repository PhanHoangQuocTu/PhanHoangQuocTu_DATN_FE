import { z } from 'zod';

export const orderManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
  status: z.string(),
});

export type OrderManagementFilterType = z.infer<typeof orderManagementFilterSchema>;
