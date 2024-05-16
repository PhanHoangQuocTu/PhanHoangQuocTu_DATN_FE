import { z } from 'zod';

export const categoryManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
});

export const handleCategoryManagementSchema = z.object({
  title: z.string().trim().max(100),
  description: z.string().trim().max(500),
});

export type CategoryManagementFilterType = z.infer<typeof categoryManagementFilterSchema>;
export type HandleCategoryManagementType = z.infer<typeof handleCategoryManagementSchema>;
