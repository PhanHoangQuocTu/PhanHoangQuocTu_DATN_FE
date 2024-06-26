import { z } from 'zod';

import { REGEX_PASSWORD } from '@/lib/regex';
import { validationMessages } from '@/lib/validations/validation.utility';

export const editProfileSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: validationMessages.required(),
    })
    .email(validationMessages.invalid('Email')),
  phoneNumber: z.string().min(1, {
    message: validationMessages.required(),
  }),
  firstName: z.string().min(1, {
    message: validationMessages.required(),
  }),
  lastName: z.string().min(1, {
    message: validationMessages.required(),
  }),
  dateOfBirth: z.string().min(1, {
    message: validationMessages.required(),
  }),
  gender: z.string().min(1, {
    message: validationMessages.required(),
  }),
  address: z.string().min(1, {
    message: validationMessages.required(),
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, {
        message: validationMessages.required(),
      })
      .regex(REGEX_PASSWORD, {
        message:
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      }),
    newPassword: z
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const activeAccountSchema = z.object({
  verifyCode: z.string().min(1, {
    message: validationMessages.required(),
  }),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
export type EditProfileType = z.infer<typeof editProfileSchema>;
export type ActiveAccountType = z.infer<typeof activeAccountSchema>;
