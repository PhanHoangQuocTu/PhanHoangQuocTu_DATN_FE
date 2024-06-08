import { z } from 'zod';

import { REGEX_PHONE } from '@/lib/regex';
import { validationMessages } from '@/lib/validations/validation.utility';

export const checkoutSchema = z.object({
  paymentMethod: z.string(),
  name: z.string().trim().min(1, 'Name is required').max(100),
  phoneNumber: z
    .string()
    .min(1, {
      message: validationMessages.required(),
    })
    .regex(REGEX_PHONE, {
      message: 'Phone number must be in the format of 84xxxxxxxx or 0xxxxxxxx.',
    }),
  address: z.string().trim().min(1, 'Address is required').max(500),
  city: z.string().min(1, 'City is required'),
  postCode: z.string().max(20).min(1, 'Post code is required'),
});

export type checkoutType = z.infer<typeof checkoutSchema>;
