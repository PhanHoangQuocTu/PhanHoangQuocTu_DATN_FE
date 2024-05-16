import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ROUTE } from '@/types';

interface Props {
  bookName: string;
}

const BookBreadCrumb: React.FC<Props> = ({ bookName }) => {
  return (
    <Breadcrumb className="py-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={ROUTE.HOME}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={ROUTE.BOOKS}>Books</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{bookName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BookBreadCrumb;
