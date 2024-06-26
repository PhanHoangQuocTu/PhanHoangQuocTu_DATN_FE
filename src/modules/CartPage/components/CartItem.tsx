import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { deleteCartItemRequest, type ICartProductByCurrentUser, updateCartRequest } from '@/api/cart';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { NumberField } from '@/components/ui/FormField/NumberField';
import { Tooltip } from '@/components/ui/tooltip';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { prettyNumber, roundNumber } from '@/lib/common';

import { useCartItem } from '../hooks/useCartItem';
import { updateCartPageSchema, type UpdateCartPageType } from '../types/schema';

interface Props {
  book: ICartProductByCurrentUser;
  quantity: number;
  id: number;
}
const CartItem: React.FC<Props> = ({ book, quantity, id }) => {
  const { bookDiscount, bookImage, bookName, bookPriceOrigin, currentPrice } = useCartItem(book);
  const { refetch } = useGetCart();

  const form = useForm<UpdateCartPageType>({
    resolver: zodResolver(updateCartPageSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const handleSubmit: SubmitHandler<UpdateCartPageType> = async () => {};

  const { mutate: updateCart } = useMutation(updateCartRequest, {
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteCartItem } = useMutation(deleteCartItemRequest, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleIncreaseQuantity = () => {
    updateCart({
      body: {
        quantity: quantity + 1,
      },
      params: {
        cartItemId: id,
      },
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      deleteCartItem({
        cartItemId: id,
      });

      return;
    }

    updateCart({
      body: {
        quantity: quantity - 1,
      },
      params: {
        cartItemId: id,
      },
    });
  };

  const handleDelete = () => {
    deleteCartItem({
      cartItemId: id,
    });
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="group">
      <HStack spacing={20} noWrap className="bg-[#f9f9f9] py-3 min-h-40 px-4 rounded-md" align={'default'}>
        <div className="relative w-40 min-h-full shrink-0 rounded-md overflow-hidden">
          <Image src={bookImage} alt={bookName} fill unoptimized priority={true} />
        </div>

        <VStack className="flex-1 min-h-full" justify={'between'}>
          <VStack>
            <VStack spacing={4}>
              <span className="text-base font-medium line-clamp-2">{bookName}</span>
              {bookDiscount && !!Number(bookDiscount) && (
                <HStack pos={'center'} align={'center'} noWrap className="bg-[#ED553B] rounded-md px-2 py-1 w-fit">
                  <span className="text-white text-xs text-nowrap">-{roundNumber(String(bookDiscount))} %</span>
                </HStack>
              )}
            </VStack>

            <HStack noWrap spacing={12}>
              <span className="text-[#ED553B] text-sm font-semibold">{currentPrice} đ</span>
              {bookDiscount && !!Number(bookDiscount) && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {prettyNumber(roundNumber(String(bookPriceOrigin)))} đ
                </span>
              )}
            </HStack>
          </VStack>

          <HStack noWrap pos={'apart'}>
            <NumberField
              size={'sm'}
              control={form.control}
              label="Quantity"
              name="quantity"
              placeholder="1"
              value={quantity}
              className="h-9 w-40"
              suffix={
                <HStack spacing={16}>
                  <button onClick={handleDecreaseQuantity} type="button" className="hover:opacity-70">
                    <Icons.minus size={16} />
                  </button>

                  <button onClick={handleIncreaseQuantity} type="button" className="hover:opacity-70">
                    <Icons.plus size={16} />
                  </button>
                </HStack>
              }
            />

            <Tooltip label="Delete">
              <Button
                size={'xs'}
                onClick={handleDelete}
                className="group-hover:opacity-100 opacity-0 duration-150 transition-all ease-linear self-end"
                variant={'destructive'}
              >
                <Icons.x />
              </Button>
            </Tooltip>
          </HStack>
        </VStack>
      </HStack>
    </FormWrapper>
  );
};

export default CartItem;
