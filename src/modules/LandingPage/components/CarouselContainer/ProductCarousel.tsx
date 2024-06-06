import React from 'react';

import { Icons } from '@/assets/icons';
import BookCard from '@/components/BookCard';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useMobile } from '@/hooks/breakpoint';
import { useGetAllBook } from '@/hooks/product/useGetAllBook';
import { useFundCarousel } from '@/hooks/useFundCarousel';
import { cn } from '@/lib/utils';

const ProductCarousel = () => {
  const isMobile = useMobile();
  const { productList } = useGetAllBook();
  const {
    carouselRef,
    selectedIndex,
    scrollSnaps,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick,
  } = useFundCarousel();

  return (
    <div className="group relative">
      <button
        className={cn(
          'absolute -left-20 top-1/2 z-50 -translate-y-1/2 rounded-sm border-2 border-black bg-white p-1 opacity-0 transition duration-300 group-hover:opacity-100',
          {
            hidden: isMobile,
          }
        )}
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        type="button"
      >
        <Icons.chevronLeft size={36} />
      </button>

      <CarouselContent className="-ml-[3rem] py-3" ref={carouselRef}>
        {productList?.map((item) => {
          const imageUrl = item?.images?.length ? item?.images[0] : '';

          return (
            <CarouselItem key={item.id} className="pl-[3rem] md:basis-1/2 lg:basis-1/5">
              <BookCard
                id={item?.id}
                name={item?.title}
                desc={item?.description}
                image={imageUrl}
                discount={Number(item?.discount)}
                price={Number(item?.price)}
                key={item?.id}
                className="col-span-1 "
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <button
        className={cn(
          'absolute -right-20 top-1/2 z-50 -translate-y-1/2 rounded-sm border-2 border-black bg-white p-1 opacity-0 transition group-hover:opacity-100',
          {
            hidden: isMobile,
          }
        )}
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        type="button"
      >
        <Icons.chevronRight size={36} />
      </button>
      <div className="mt-9 flex justify-center gap-2 md:mt-12">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            aria-label="dot"
            className={cn('h-4 w-4 rounded-full bg-[#D9D9D9]', {
              'bg-[#122A5F]': selectedIndex === index,
            })}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;

type PropType = React.PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
