import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { addToCartRequest } from '@/api/cart';
import { type IGetDetailBookResponse } from '@/api/product';
import { Icons } from '@/assets/icons';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { NumberField } from '@/components/ui/FormField/NumberField';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useGetReviewByBookId } from '@/hooks/review/useGetReviewByBookId';
import { prettyNumber, roundNumber } from '@/lib/common';

import { bookDetailPageSchema, type BookDetailPageType } from '../types/schema';

interface Props {
  data: IGetDetailBookResponse | undefined;
}

const BookInfo: React.FC<Props> = ({ data }) => {
  const { reviewList } = useGetReviewByBookId();

  const bookImage = React.useMemo(() => {
    if (!data) return '';

    if (data?.images?.length) {
      return data?.images[0] || '';
    }

    return '';
  }, [data]);

  const priveValue = React.useMemo(() => {
    if (!data?.discount) return String(data?.price || 0);

    const discount = Number(data?.discount);
    const price = Number(data?.price);

    return String(price - (price * discount) / 100);
  }, [data?.discount, data?.price]);

  const form = useForm<BookDetailPageType>({
    resolver: zodResolver(bookDetailPageSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const { mutate: addToCart } = useMutation(addToCartRequest, {
    onSuccess: () => {
      form.reset({
        quantity: 1,
      });
      toast.success('Add to cart successfully!');
    },
  });

  const handleSubmit: SubmitHandler<BookDetailPageType> = async (formData) => {
    if (!data?.id) return;

    addToCart({
      body: {
        quantity: formData.quantity,
      },
      params: {
        productId: Number(data?.id),
      },
    });
  };

  const handleIncreaseQuantity = () => {
    form.setValue('quantity', form.watch('quantity') + 1);
  };

  const handleDecreaseQuantity = () => {
    if (form.watch('quantity') > 1) {
      form.setValue('quantity', form.watch('quantity') - 1);
    }
  };

  const avgRating = React.useMemo(() => {
    if (!reviewList || reviewList.length === 0) return 0;

    const value = reviewList.reduce((acc, cur) => acc + (cur.ratings || 0), 0) / reviewList.length;
    return roundNumber(String(value), 1);
  }, [reviewList]);

  return (
    <ShadowContainer className="grid grid-cols-5 gap-6 h-96">
      <div className="relative col-span-2 rounded-lg overflow-hidden">
        <Image src={bookImage} alt={data?.title || 'book img'} fill unoptimized />
      </div>

      <VStack justify={'between'} className="col-span-3">
        <VStack>
          <span className="text-2xl font-medium">{data?.title}</span>

          <HStack noWrap spacing={8} className="text-xs font-medium">
            <label>Publisher:</label>
            <span>{data?.publisher?.name}</span>
          </HStack>

          <HStack noWrap spacing={8} className="text-xs font-medium">
            <label>Author:</label>
            <span>{data?.author?.name}</span>
          </HStack>

          <HStack noWrap spacing={8} className="text-xs font-medium">
            <label>Rating:</label>
            {avgRating ? (
              <HStack noWrap>
                <span>{avgRating}</span>
                <Icons.star fill="#FFC107" size={16} />
              </HStack>
            ) : (
              <span>No rating</span>
            )}
          </HStack>

          <VStack spacing={4}>
            <label>Price:</label>
            <HStack noWrap spacing={12}>
              <span className="text-2xl text-[#ED553B] font-medium">
                {prettyNumber(roundNumber(String(priveValue)))} đ
              </span>

              {data?.discount && !!Number(data?.discount) && (
                <span className="text-lg text-gray-400 line-through font-medium">
                  {prettyNumber(roundNumber(String(data?.price)))} đ
                </span>
              )}
              {data?.discount && !!Number(data?.discount) && (
                <span className="text-white bg-[#ED553B] rounded-md px-2 py-1">-{roundNumber(data?.discount)} %</span>
              )}
            </HStack>
          </VStack>
        </VStack>

        <FormWrapper className="flex flex-col gap-4" form={form} onSubmit={handleSubmit}>
          <HStack noWrap spacing={16}>
            <label>Quantity</label>
            <NumberField
              size={'sm'}
              control={form.control}
              name="quantity"
              containerClassName="max-w-60"
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
          </HStack>

          <Button type="submit" className="w-fit">
            Add to cart
          </Button>
        </FormWrapper>
      </VStack>
    </ShadowContainer>
  );
};

export default BookInfo;
