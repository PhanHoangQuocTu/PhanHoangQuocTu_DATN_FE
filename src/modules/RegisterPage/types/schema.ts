import { z } from 'zod';

import { REGEX_PASSWORD, REGEX_PHONE } from '@/lib/regex';
import { validationMessages } from '@/lib/validations/validation.utility';

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: validationMessages.required(),
      })
      .email(validationMessages.invalid('Email')),
    phoneNumber: z
      .string()
      .min(1, {
        message: validationMessages.required(),
      })
      .regex(REGEX_PHONE, {
        message: 'Phone number must be in the format of 84xxxxxxxx or 0xxxxxxxx.',
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
    confirmPassword: z
      .string()
      .min(1, {
        message: validationMessages.required(),
      })
      .regex(REGEX_PASSWORD, {
        message:
          'Confirm Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterType = z.infer<typeof registerSchema>;
