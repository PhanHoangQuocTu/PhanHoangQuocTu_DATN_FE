import { z } from 'zod';

export const publisherManagementFilterSchema = z.object({
  search: z.string().trim().max(100),
});

export const handlePublisherManagementSchema = z.object({
  name: z.string().trim().max(100),
  description: z.string().trim().max(500),
});

export type PublisherManagementFilterType = z.infer<typeof publisherManagementFilterSchema>;
export type HandlePublisherManagementType = z.infer<typeof handlePublisherManagementSchema>;
