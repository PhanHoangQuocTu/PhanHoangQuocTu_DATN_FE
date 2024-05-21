import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createOrderRequest, getVnPayUrlRequest } from '@/api/order';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { useAuth } from '@/hooks/useAuth';
import { env } from '@/lib/const';
import { ROUTE } from '@/types';

import CartSummary from '../CartPage/components/CartSummary';
import CheckoutDetail from './components/CheckoutDetail';
import PaymentMethod from './components/PaymentMethod';
import { PAYMENT_METHOD_VALUE } from './types/const';
import { checkoutSchema, type checkoutType } from './types/schema';

const CheckoutPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { cartCheckout, totalPriceValue } = useGetCart();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTE.HOME);
    }
  }, [isLoggedIn, router]);

  const form = useForm<checkoutType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cash',
      name: '',
      phoneNumber: '',
      address: '',
      city: '',
      postCode: '',
    },
  });

  const [paymentMethod] = form.watch(['paymentMethod']);

  const { mutate: getVnpayReturnUrl } = useMutation(getVnPayUrlRequest, {
    onSuccess: (data) => {
      router.replace(data?.url);
    },
  });

  const { mutate: createOrder } = useMutation(createOrderRequest, {
    onSuccess: (data) => {
      if (paymentMethod === PAYMENT_METHOD_VALUE.cash) {
        toast.success('Create order successfully!');
        form.reset();
        router.replace(ROUTE.MY_ORDER);
        return;
      }

      const returnUrl = `${env.APP_URL}/${ROUTE.VNPAY_RETURN}?orderId=${data.id}`;

      getVnpayReturnUrl({
        params: {
          returnUrlLocal: returnUrl,
        },
        body: {
          totalAmount: totalPriceValue,
        },
      });
    },
  });

  const handleSubmit: SubmitHandler<checkoutType> = async (formData) => {
    const formWrap = {
      isPaid: 'false',
      type: formData.paymentMethod,
      shippingAddress: {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        country: 'Vietnam',
        phoneNumber: formData.phoneNumber,
        postCode: formData.postCode,
        state: formData.city,
      },
      orderedProducts: cartCheckout,
    };
    createOrder(formWrap);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="container py-8 space-y-5">
      <div className="grid grid-cols-6 gap-4">
        <VStack className="col-span-2">
          <CartSummary isShowCheckoutBtn={false} />

          <PaymentMethod />
        </VStack>

        <CheckoutDetail className="col-span-4" />
      </div>

      <HStack pos={'apart'}>
        <span className="text-red-500 text-xs font-semibold">
          Note: You need to active your account before you can create an order
        </span>
        <Button disabled={!user?.isActice || !totalPriceValue} type="submit">
          Create Order
        </Button>
      </HStack>
    </FormWrapper>
  );
};

export default CheckoutPage;
