import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { forgotPasswordRequest } from '@/api/auth';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { type FCC } from '@/types';

import { forgotPasswordSchema, type ForgotPasswordType } from '../types/schema';

const ForgotPasswordDialog: FCC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate: forgotPassword, isLoading } = useMutation(forgotPasswordRequest, {
    onSuccess: () => {
      setIsOpen(false);
      form.reset({
        email: '',
      });
      toast.success('Please check your email to reset your password');
    },
  });

  const handleSubmit: SubmitHandler<ForgotPasswordType> = async (formData) => {
    forgotPassword({
      email: formData.email,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Forgot Password</AlertDialogHeader>
        <FormWrapper form={form} onSubmit={handleSubmit}>
          <TextField
            size={'sm'}
            control={form.control}
            isError={!!form?.formState?.errors?.email}
            label="Email"
            name="email"
            placeholder="Please Enter Email"
          />
        </FormWrapper>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button disabled={isLoading} type="submit" variant={'default'}>
              Submit
            </Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
