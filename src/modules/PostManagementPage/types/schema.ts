import { z } from 'zod';

export const postManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
  isApprove: z.string().optional(),
});

export type PostManagementFilterType = z.infer<typeof postManagementFilterSchema>;
