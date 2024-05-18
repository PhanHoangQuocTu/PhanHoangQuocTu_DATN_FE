import { z } from 'zod';

export const checkoutSchema = z.object({
  paymentMethod: z.string(),
  name: z.string().trim().min(1, 'Name is required').max(100),
  phoneNumber: z.string().trim().min(1, 'Phone number is required').max(20),
  address: z.string().trim().min(1, 'Address is required').max(500),
  city: z.string().min(1, 'City is required'),
  postCode: z.string().max(20).min(1, 'Post code is required'),
});

export type checkoutType = z.infer<typeof checkoutSchema>;
