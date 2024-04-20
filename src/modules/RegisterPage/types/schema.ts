import { z } from 'zod';

import { REGEX_PASSWORD } from '@/lib/regex';
import { validationMessages } from '@/lib/validations/validation.utility';

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: validationMessages.required(),
      })
      .email(validationMessages.invalid('Email')),
    phoneNumber: z.string().min(1, {
      message: validationMessages.required(),
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
