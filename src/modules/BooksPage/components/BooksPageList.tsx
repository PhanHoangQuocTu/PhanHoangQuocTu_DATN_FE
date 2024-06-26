import React from 'react';

import { type IGetAllProductDetail } from '@/api/product';
import BookCard from '@/components/BookCard';
import { PaginationList } from '@/components/pagination';
import { HStack, Show } from '@/components/ui/Utilities';
import { type IPaging } from '@/types';

import { LIMIT_BOOK_LIST } from '../types/const';
import BookListSkeleton from './BookListSkeleton';
import BookNoData from './BookNoData';

interface Props {
  data: IGetAllProductDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const BooksPageList: React.FC<Props> = ({ data, paging, isLoading, onPageChange }) => {
  return (
    <HStack spacing={16} className="col-span-5">
      <Show when={isLoading}>
        <BookListSkeleton totalIems={LIMIT_BOOK_LIST} />
      </Show>

      <Show when={!isLoading && data.length === 0}>
        <BookNoData />
      </Show>

      <HStack className="w-full gap-x-5 gap-y-10 grid grid-cols-4 grid-rows-3">
        {data?.map((book) => {
          const imageUrl = book?.images?.length ? book?.images[0] : '';
          return (
            <BookCard
              id={book.id}
              name={book.title}
              desc={book.description}
              image={imageUrl}
              discount={+book.discount}
              price={+book.price}
              key={book.id}
              className="col-span-1 "
            />
          );
        })}
      </HStack>

      {data?.length > 0 && (
        <PaginationList
          pageSize={paging.limit}
          currentPage={paging.page}
          onPageChange={(newPage) => onPageChange(newPage)}
          siblingCount={1}
          totalCount={paging.total ?? 0}
        />
      )}
    </HStack>
  );
};

export default BooksPageList;
