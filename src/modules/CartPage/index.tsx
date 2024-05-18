import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { ScrollArea } from '@/components/ui/scrollArea';
import { VStack } from '@/components/ui/Utilities';
import { useGetCart } from '@/hooks/cart/useGetCart';

import CartItem from './components/CartItem';

const CartPage = () => {
  const { cart, refetch } = useGetCart();

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container py-8 space-y-5">
      <span className="text-xl font-semibold">Cart</span>

      <div className="grid grid-cols-5 gap-5">
        <ShadowContainer className="col-span-3 min-h-[100vh]">
          <ScrollArea className="max-h-[100vh]">
            <VStack className="">
              {cart?.map((item) => (
                <CartItem key={item.id} book={item?.product} quantity={item?.quantity} id={item?.id} />
              ))}
            </VStack>
          </ScrollArea>
        </ShadowContainer>

        <ShadowContainer className="col-span-2 h-fit">
          <VStack></VStack>
        </ShadowContainer>
      </div>
    </div>
  );
};

export default CartPage;
