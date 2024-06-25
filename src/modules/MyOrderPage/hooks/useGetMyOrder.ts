import React from 'react';

import { useGetMyOrdersQuery } from '@/api/order/queries';
import usePaging from '@/hooks/usePaging';

export const useGetMyOrder = (limit = 5) => {
  const { paging, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<any>(limit, {});
  const [status, setStatus] = React.useState('');

  const { data, ...rest } = useGetMyOrdersQuery({
    variables: {
      page: paging.page,
      limit: paging.limit,
      status,
    },
  });

  React.useEffect(() => {
    if (!data?.data) return;

    if (data?.data.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.data, onPageChange, onTotalItemsChange, paging.page]);

  const totalPriceList = React.useMemo(() => {
    if (!data) return [];

    return data?.data?.map((item) => {
      const priceOrigin = item?.products?.reduce((acc, book) => {
        const bookPrice =
          Number(book.product_unit_price) - (Number(book.product_unit_price) * Number(book.discount)) / 100;
        return acc + bookPrice * Number(book.product_quantity);
      }, 0);

      return {
        id: item?.id,
        price: priceOrigin,
      };
    });
  }, [data]);

  return {
    data,
    orderList: data?.data || [],
    meta: data?.meta,
    paging,
    onTotalItemsChange,
    onPageChange,
    handleFilterChange,
    totalPriceList,
    setStatus,
    statusOrder: status,
    ...rest,
  };
};
