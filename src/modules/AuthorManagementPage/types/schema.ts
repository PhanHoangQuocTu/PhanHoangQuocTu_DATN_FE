import { z } from 'zod';

export const authorManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
});

export const handleAuthorManagementSchema = z.object({
  name: z.string().trim().max(100),
  gender: z.string().trim(),
  dateOfBirth: z.string().trim(),
});

export type AuthorManagementFilterType = z.infer<typeof authorManagementFilterSchema>;
export type HandleAuthorManagementType = z.infer<typeof handleAuthorManagementSchema>;
