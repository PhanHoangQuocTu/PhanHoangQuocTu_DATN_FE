import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllOrder } from '@/hooks/order/useGetAllOrder';
import { type NextPageWithLayout } from '@/types';

import OrderManagementFilter from './components/OrderManagementFilter';
import OrderManagementTable from './components/OrderManagementTable';

const OrderManagementPage: NextPageWithLayout = () => {
  const { data, isLoading, paging, onPageChange, handleSearchChange, refetch, totalPriceList } = useGetAllOrder();

  return (
    <VStack>
      <OrderManagementFilter handleSearchChange={handleSearchChange} />

      <OrderManagementTable
        data={data}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetch}
        totalPriceList={totalPriceList}
      />
    </VStack>
  );
};

export default OrderManagementPage;
