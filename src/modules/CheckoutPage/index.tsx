import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createOrderRequest } from '@/api/order';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { ROUTE } from '@/types';

import CartSummary from '../CartPage/components/CartSummary';
import CheckoutDetail from './components/CheckoutDetail';
import PaymentMethod from './components/PaymentMethod';
import { PAYMENT_METHOD_VALUE } from './types/const';
import { checkoutSchema, type checkoutType } from './types/schema';

const CheckoutPage = () => {
  const { cartCheckout } = useGetCart();
  const router = useRouter();

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

  const { mutate: createOrder } = useMutation(createOrderRequest, {
    onSuccess: () => {
      toast.success('Create order successfully!');
      form.reset();
      router.replace(ROUTE.HOME);
    },
  });

  const handleSubmit: SubmitHandler<checkoutType> = async (formData) => {
    if (formData.paymentMethod === PAYMENT_METHOD_VALUE.cash) {
      createOrder({
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
      });
    }
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

      <HStack pos={'right'}>
        <Button type="submit">Create Order</Button>
      </HStack>
    </FormWrapper>
  );
};

export default CheckoutPage;
