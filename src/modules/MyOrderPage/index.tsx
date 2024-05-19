import React from 'react';

import { PaginationList } from '@/components/pagination';
import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';

import MyOrderItem from './components/MyOrderItem';
import { useGetMyOrder } from './hooks/useGetMyOrder';

const MyOrderPage = () => {
  const { orderList, paging, onPageChange, refetch } = useGetMyOrder();

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container py-8">
      <ShadowContainer className="min-h-[100vh] space-y-5">
        <span className="text-xl font-semibold">My Order</span>
        <VStack className="min-h-[100vh]">
          {orderList?.map((item) => (
            <MyOrderItem key={item.id} data={item} refetch={refetch} />
          ))}
        </VStack>

        {orderList?.length > 0 && (
          <PaginationList
            pageSize={paging.limit}
            currentPage={paging.page}
            onPageChange={(newPage) => onPageChange(newPage)}
            siblingCount={1}
            totalCount={paging.total ?? 0}
          />
        )}
      </ShadowContainer>
    </div>
  );
};

export default MyOrderPage;
