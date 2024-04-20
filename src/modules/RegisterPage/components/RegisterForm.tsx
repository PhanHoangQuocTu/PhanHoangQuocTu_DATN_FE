import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { registerRequest } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { ROUTE } from '@/types';

import { REGISTER_FORM_DEFAULT_DATA } from '../types/const';
import { registerSchema, type RegisterType } from '../types/schema';

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: REGISTER_FORM_DEFAULT_DATA,
    mode: 'onChange',
  });

  const {
    watch,
    reset,
    formState: { errors },
  } = form;

  const [email, phoneNumber, password, confirmPassword] = watch([
    'email',
    'phoneNumber',
    'password',
    'confirmPassword',
  ]);

  const { mutate: register } = useMutation(registerRequest, {
    onSuccess: () => {
      toast.success('Register successfully!');
      reset(REGISTER_FORM_DEFAULT_DATA);
      router.push(ROUTE.LOGIN);
    },
  });

  const handleSubmit: SubmitHandler<RegisterType> = async (formData) => {
    register({
      ...formData,
      firstName: '',
      lastName: '',
    });
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="px-10 py-20 space-y-12">
      <VStack spacing={12}>
        <span className="text-xl font-medium text-gray-500 lg:text-2xl ">Welcome!</span>
        <span className="text-2xl font-semibold lg:text-3xl">Register your account</span>
      </VStack>

      <VStack justify={'between'} className="h-full">
        <VStack spacing={20}>
          <TextField
            size={'sm'}
            control={form.control}
            isError={!!errors?.email}
            label="Email"
            name="email"
            placeholder="Please Enter Email"
          />

          <TextField
            size={'sm'}
            control={form.control}
            isError={!!errors?.phoneNumber}
            label="Phone Number"
            name="phoneNumber"
            placeholder="Please Enter Phone Number"
          />

          <TextField
            size={'sm'}
            type="password"
            control={form.control}
            isError={!!errors?.password}
            name="password"
            label="Password"
            placeholder="Please Enter Password"
          />

          <TextField
            size={'sm'}
            type="password"
            control={form.control}
            isError={!!errors?.confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Please Enter Confirm Password"
          />

          <Button fullWidth type="submit" disabled={!email || !password || !confirmPassword || !phoneNumber}>
            Register
          </Button>
        </VStack>

        <VStack align={'center'} spacing={4}>
          <span className="text-base font-medium text-gray-400">Already have an account</span>
          <Link href={ROUTE.REGISTER} className="text-sm font-medium hover:text-gray-300">
            Login
          </Link>
        </VStack>
      </VStack>
    </FormWrapper>
  );
};

export default RegisterForm;
