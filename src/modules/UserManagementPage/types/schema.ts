import { z } from 'zod';

export const userManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
  isActive: z.string().optional(),
});

export type UserManagementFilterType = z.infer<typeof userManagementFilterSchema>;
