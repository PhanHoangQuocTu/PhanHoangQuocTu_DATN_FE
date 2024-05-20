import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { sendVerifyCodeRequest, verifyAccountRequest } from '@/api/user';
import { Icons } from '@/assets/icons';
import TransitionLayout from '@/components/custom/TransitionLayout';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { onMutateError } from '@/lib/common';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores';

import { activeAccountSchema, type ActiveAccountType } from '../types/schema';

const ActiveAccount = () => {
  const [countdown, setCountdown] = React.useState(0);
  const [isCountingDown, setIsCountingDown] = React.useState(false);
  const setUser = useUserStore.use.setUser();
  const { user } = useAuth();
  const form = useForm<ActiveAccountType>({
    resolver: zodResolver(activeAccountSchema),
    defaultValues: {
      verifyCode: '',
    },
    mode: 'onChange',
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const [verifyCode] = watch(['verifyCode']);

  const { mutate: activeAccount, isLoading } = useMutation(verifyAccountRequest, {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: onMutateError,
  });

  const { mutate: sendVerifyCode, isLoading: isLoadingSend } = useMutation(sendVerifyCodeRequest, {
    onSuccess: () => {
      toast.success('Send verify code successfully!');
      setCountdown(60);
      setIsCountingDown(true);
    },
    onError: onMutateError,
  });

  const handleSubmit: SubmitHandler<ActiveAccountType> = async (formData) => {
    activeAccount({
      verifyCode: formData.verifyCode,
    });
  };

  const handleSendVerifyCode = () => {
    sendVerifyCode();
  };

  React.useEffect(() => {
    let intervalId: any;

    if (isCountingDown && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((currentCountdown) => currentCountdown - 1);
      }, 1000);
    } else {
      setIsCountingDown(false);
    }

    return () => clearInterval(intervalId);
  }, [isCountingDown, countdown]);

  React.useEffect(() => {
    if (countdown === 0) {
      setIsCountingDown(false);
    }
  }, [countdown]);
  return (
    <TransitionLayout>
      <ShadowContainer>
        <Show when={!user?.isActice}>
          <FormWrapper form={form} onSubmit={handleSubmit}>
            <HStack noWrap align={'end'} className="gap-4">
              <div className="flex-1">
                <TextField
                  fullWidth
                  size={'sm'}
                  control={form.control}
                  isError={!!errors?.verifyCode}
                  label="Verify Code"
                  name="verifyCode"
                  placeholder="Please Enter Verify Code"
                  suffix={
                    <button
                      type="button"
                      onClick={handleSendVerifyCode}
                      disabled={isCountingDown || isLoadingSend}
                      className={cn({
                        'opacity-60': isCountingDown || isLoadingSend,
                      })}
                    >
                      {isCountingDown ? `${countdown} seconds` : 'Send Code'}
                    </button>
                  }
                />
              </div>

              <Button className="w-fit" type="submit" disabled={!verifyCode || isLoading}>
                Submit
              </Button>
            </HStack>
          </FormWrapper>
        </Show>

        <Show when={user?.isActice}>
          <VStack align={'center'}>
            <Icons.check size={40} color="#00C48C" />

            <span>Your account has been activated</span>
          </VStack>
        </Show>
      </ShadowContainer>
    </TransitionLayout>
  );
};

export default ActiveAccount;
