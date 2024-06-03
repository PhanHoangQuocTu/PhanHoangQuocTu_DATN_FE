import { z } from 'zod';

export const userManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
  isActive: z.string().optional(),
});

export const userDetailSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
});

export type UserManagementFilterType = z.infer<typeof userManagementFilterSchema>;
export type UserDetailType = z.infer<typeof userDetailSchema>;
