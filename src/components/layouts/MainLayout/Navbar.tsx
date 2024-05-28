import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedValue } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Icons } from '@/assets/icons';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { useGetAllBook } from '@/hooks/product/useGetAllBook';
import { useAuth } from '@/hooks/useAuth';
import { prettyNumber } from '@/lib/common';
import BookNoData from '@/modules/BooksPage/components/BookNoData';
import { booksPageFilterSchema, type BooksPageFilterType } from '@/modules/BooksPage/types/schema';
import { ROUTE } from '@/types';

import AvatarDropdown from './components/AvatarDropdown';

const Navbar = () => {
  const [isBlurBox, setIsBlurBox] = React.useState(false);
  const [shouldHideShadowContainer, setShouldHideShadowContainer] = React.useState(true);

  const { isLoggedIn, firstLetterName } = useAuth();
  const { productList, filter, handleSearchChange } = useGetAllBook(5);

  const form = useForm<BooksPageFilterType>({
    resolver: zodResolver(booksPageFilterSchema),
    defaultValues: {
      search: '',
    },
  });

  const [search] = form.watch(['search']);

  const [debounceValue] = useDebouncedValue(search, 500);

  const handleSubmit: SubmitHandler<BooksPageFilterType> = async () => {};

  React.useEffect(() => {
    if (!isBlurBox) {
      handleSearchChange({ ...filter, search: debounceValue });
    }
  });

  const handleOnChange = (value: string) => {
    form.setValue('search', value);
    setIsBlurBox(false);
  };

  const handleOnBlur = () => {
    setShouldHideShadowContainer(true);
  };

  const handleLinkFocus = () => {
    setShouldHideShadowContainer(false);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (shouldHideShadowContainer) {
      timer = setTimeout(() => {
        setIsBlurBox(true);
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [shouldHideShadowContainer]);

  const calPrice = (price: number | string, discount: number | string | undefined) => {
    if (!discount) return String(price);

    return String(Number(price) - (Number(price) * Number(discount)) / 100);
  };

  const renderNavbar = React.useMemo(() => {
    if (!isLoggedIn)
      return (
        <HStack noWrap spacing={12}>
          <Link href={ROUTE.LOGIN}>
            <Button size={'sm'}>Sign In</Button>
          </Link>

          <Link href={ROUTE.REGISTER}>
            <Button size={'sm'}>Sign Up</Button>
          </Link>
        </HStack>
      );

    return (
      <HStack noWrap spacing={16}>
        <AvatarDropdown>
          <Button className="flex items-center gap-2">
            <Icons.user size={16} />

            <span className="text-lg font-medium">{firstLetterName}</span>
          </Button>
        </AvatarDropdown>

        <Link href={ROUTE.CART} className="hover:opacity-70">
          <HStack spacing={8} noWrap>
            <Icons.shoppingCart size={16} />

            <span className="text-lg text-primary font-medium">Cart</span>
          </HStack>
        </Link>
      </HStack>
    );
  }, [firstLetterName, isLoggedIn]);

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="col-span-2">
      <HStack spacing={12} noWrap>
        <div className="relative">
          <TextField
            size={'sm'}
            control={form.control}
            name="search"
            className="rounded-md min-w-96 h-10"
            suffix={<Icons.search size={16} />}
            placeholder="Search books..."
            onFocus={() => {
              setIsBlurBox(false);
              setShouldHideShadowContainer(false);
            }}
            onBlur={handleOnBlur}
            onChange={(e) => {
              handleOnChange(e.target.value);
              setIsBlurBox(false);
            }}
          />

          {!isBlurBox && (
            <ShadowContainer className="absolute flex flex-col gap-2 top-12 w-96 z-50 left-0 bg-white p-2">
              <Show when={productList.length === 0}>
                <BookNoData />
              </Show>
              {!!productList.length &&
                productList.map((book) => {
                  const priveValue = calPrice(book?.price, book?.discount);
                  return (
                    <Link
                      key={book.id}
                      href={`${ROUTE.BOOKS}/${book.id}`}
                      className="hover:opacity-70"
                      onFocus={handleLinkFocus}
                      onClick={() => {
                        form.reset({ search: '' });
                        setIsBlurBox(true);
                      }}
                    >
                      <ShadowContainer className="p-2">
                        <HStack noWrap>
                          <Image src={book?.images[0]} width={48} height={48} alt="book image" />
                          <VStack>
                            <span>{book.title}</span>
                            <HStack noWrap spacing={4}>
                              <span className="text-sm text-[#ED553B] font-medium">{prettyNumber(priveValue)} đ</span>
                              {book.discount && (
                                <span className="text-sm text-gray-400 line-through font-medium">
                                  {prettyNumber(book.price)} đ
                                </span>
                              )}
                            </HStack>
                          </VStack>
                        </HStack>
                      </ShadowContainer>
                    </Link>
                  );
                })}
            </ShadowContainer>
          )}
        </div>

        {renderNavbar}
      </HStack>
    </FormWrapper>
  );
};

export default Navbar;
