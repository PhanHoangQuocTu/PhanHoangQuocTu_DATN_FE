import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { ShadowContainer } from '@/components/ShadowContainer';
import { ScrollArea } from '@/components/ui/scrollArea';
import { VStack } from '@/components/ui/Utilities';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE } from '@/types';

import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const CartPage = () => {
  const { cart, refetch } = useGetCart();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  React.useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You need to login first!!!');
      router.push(ROUTE.LOGIN);
    }
  }, [isLoggedIn, router]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-5 gap-5">
        <ShadowContainer className="col-span-3 min-h-[100vh] space-y-5">
          <span className="text-xl font-semibold">Cart</span>
          <ScrollArea className="max-h-[100vh]">
            <VStack className="">
              {cart?.map((item) => (
                <CartItem key={item.id} book={item?.product} quantity={item?.quantity} id={item?.id} />
              ))}
            </VStack>
          </ScrollArea>
        </ShadowContainer>

        <CartSummary className="col-span-2" />
      </div>
    </div>
  );
};

export default CartPage;
