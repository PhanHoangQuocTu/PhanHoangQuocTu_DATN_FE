import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetDetailBook } from '@/hooks/product/useGetDetailBook';

import BookBreadCrumb from './components/BookBreadCrumb';
import BookDescription from './components/BookDescription';
import BookInfo from './components/BookInfo';
import BookRating from './components/BookRating';

const BookDetailPage = () => {
  const { bookName, data } = useGetDetailBook();

  return (
    <VStack spacing={16} className="container pt-4 pb-10">
      <BookBreadCrumb bookName={bookName} />

      <BookInfo data={data} />

      <BookDescription data={data} />

      <BookRating />
    </VStack>
  );
};

export default BookDetailPage;
