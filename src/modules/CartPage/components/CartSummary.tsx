import Link from 'next/link';
import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { prettyNumber, roundNumber } from '@/lib/common';
import { ROUTE } from '@/types';

interface Props {
  className?: string;
  isShowCheckoutBtn?: boolean;
}

const CartSummary: React.FC<Props> = ({ className, isShowCheckoutBtn = true }) => {
  const { bookPrices, totalDiscountPrice, totalPrice } = useGetCart();

  return (
    <ShadowContainer className={className}>
      <span className="text-xl font-semibold">Summary</span>

      <VStack spacing={16}>
        <HStack noWrap className="grid grid-cols-2">
          <VStack className="col-span-1">
            <span className="test-sm font-medium">Book Price</span>
            <span className="test-sm font-medium">Discount</span>
            <span className="test-sm font-medium">Shipping</span>
          </VStack>

          <VStack className="col-span-1">
            <span className="test-sm font-medium text-right">{prettyNumber(roundNumber(String(bookPrices)))} đ</span>
            <span className="test-sm font-medium text-right">
              - {prettyNumber(roundNumber(String(totalDiscountPrice)))} đ
            </span>
            <span className="test-sm font-medium text-right">{prettyNumber(roundNumber('0'))} đ</span>
          </VStack>

          <Separator className="col-span-2 my-4" />
          <VStack className="col-span-1">
            <span className="test-sm font-medium">Total</span>
          </VStack>

          <VStack className="col-span-1">
            <span className="test-sm font-medium text-right">{totalPrice} đ</span>
          </VStack>
        </HStack>

        <Show when={!!isShowCheckoutBtn}>
          <Link href={ROUTE.CHECKOUT} className="w-full">
            <Button className="w-full">Checkout</Button>
          </Link>
        </Show>
      </VStack>
    </ShadowContainer>
  );
};

export default CartSummary;
