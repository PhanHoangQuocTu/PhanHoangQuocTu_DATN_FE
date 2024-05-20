import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { changePasswordRequest } from '@/api/user';
import TransitionLayout from '@/components/custom/TransitionLayout';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { onMutateError } from '@/lib/common';

import { changePasswordSchema, type ChangePasswordType } from '../types/schema';

const ChangePassword = () => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const [newPassword, confirmPassword, currentPassword] = watch(['newPassword', 'confirmPassword', 'currentPassword']);

  const { mutate: changePassword } = useMutation(changePasswordRequest, {
    onSuccess: () => {
      toast.success('Change password successfully!');
      form.reset({
        confirmPassword: '',
        currentPassword: '',
        newPassword: '',
      });
    },
    onError: onMutateError,
  });

  const handleSubmit: SubmitHandler<ChangePasswordType> = async (formData) => {
    changePassword({
      newPassword: formData.newPassword,
      currentPassword: formData.currentPassword,
    });
  };

  return (
    <TransitionLayout>
      <ShadowContainer>
        <FormWrapper form={form} onSubmit={handleSubmit}>
          <VStack justify={'between'} className="gap-4">
            <TextField
              size={'sm'}
              type="password"
              control={form.control}
              isError={!!errors?.currentPassword}
              label="Current Password"
              name="currentPassword"
              placeholder="Please Enter Current Password"
            />

            <TextField
              size={'sm'}
              type="password"
              control={form.control}
              isError={!!errors?.newPassword}
              label="New Password"
              name="newPassword"
              placeholder="Please Enter New Password"
            />

            <TextField
              size={'sm'}
              type="password"
              control={form.control}
              isError={!!errors?.confirmPassword}
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Please Enter Confirm Password"
            />

            <Button className="w-fit" type="submit" disabled={!newPassword || !confirmPassword || !currentPassword}>
              Save
            </Button>
          </VStack>
        </FormWrapper>
      </ShadowContainer>
    </TransitionLayout>
  );
};

export default ChangePassword;
