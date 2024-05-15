import React from 'react';

import { useGetAllBook } from '@/hooks/product/useGetAllBook';

import BooksPageHeading from './components/BooksPageHeading';
import BooksPageList from './components/BooksPageList';
import BooksPageSidebar from './components/BooksPageSidebar';
import { LIMIT_BOOK_LIST } from './types/const';

const BooksPage = () => {
  const { productList, paging, handleSearchChange, onPageChange, isLoading } = useGetAllBook(LIMIT_BOOK_LIST);

  return (
    <div className="space-y-5 pb-10">
      <BooksPageHeading />

      <div className="container grid grid-cols-7 gap-5">
        <BooksPageSidebar handleSearchChange={handleSearchChange} />

        <BooksPageList data={productList} paging={paging} isLoading={isLoading} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default BooksPage;
