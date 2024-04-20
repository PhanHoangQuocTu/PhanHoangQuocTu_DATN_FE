import { z } from 'zod';

import { REGEX_PASSWORD } from '@/lib/regex';
import { validationMessages } from '@/lib/validations/validation.utility';

export const signInSchema = z.object({
  email: z.string().min(1, validationMessages.required()).email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(1, {
      message: validationMessages.required(),
    })
    .regex(REGEX_PASSWORD, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
});

export type SignInType = z.infer<typeof signInSchema>;
