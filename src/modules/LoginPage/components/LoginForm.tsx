import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { loginRequest } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { useUserStore } from '@/stores';
import { ROUTE } from '@/types';

import { LOGIN_FORM_DEFAULT_DATA } from '../types/const';
import { signInSchema, type SignInType } from '../types/schema';

const LoginForm: React.FC = () => {
  const setAccessToken = useUserStore.use.setAccessToken();
  const setRefreshToken = useUserStore.use.setRefreshToken();
  const setUser = useUserStore.use.setUser();
  const router = useRouter();

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: LOGIN_FORM_DEFAULT_DATA,
    mode: 'onChange',
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const [email, password] = watch(['email', 'password']);

  const { mutate: login } = useMutation(loginRequest, {
    onSuccess: ({ user, token }) => {
      toast.success('Login successfully!');
      setUser(user);
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);
      form.reset(LOGIN_FORM_DEFAULT_DATA);
      router.push(ROUTE.HOME);
    },
  });

  const handleSubmit: SubmitHandler<SignInType> = async (formData) => {
    login(formData);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="px-10 py-20 space-y-12">
      <VStack spacing={12}>
        <span className="text-xl font-medium text-gray-500 lg:text-2xl ">Welcome back!</span>
        <span className="text-2xl font-semibold lg:text-3xl">Login to your account</span>
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

          <VStack spacing={4}>
            <TextField
              size={'sm'}
              type="password"
              control={form.control}
              isError={!!errors?.password}
              name={'password'}
              label="Password"
              placeholder="Please Enter Password"
            />

            <button className="text-xs font-medium w-fit self-end text-gray-400 hover:text-black">
              Forgot Password?
            </button>
          </VStack>

          <Button fullWidth type="submit" disabled={!email || !password}>
            Login
          </Button>
        </VStack>

        <VStack align={'center'} spacing={4}>
          <span className="text-base font-medium text-gray-400">Or Sign Up Using</span>
          <Link href={ROUTE.REGISTER} className="text-sm font-medium hover:text-gray-300">
            SIGN UP
          </Link>
        </VStack>
      </VStack>
    </FormWrapper>
  );
};

export default LoginForm;
