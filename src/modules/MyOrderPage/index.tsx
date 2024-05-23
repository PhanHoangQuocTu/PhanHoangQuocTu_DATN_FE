import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { PaginationList } from '@/components/pagination';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Show, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE } from '@/types';

import BookNoData from '../BooksPage/components/BookNoData';
import MyOrderItem from './components/MyOrderItem';
import { useGetMyOrder } from './hooks/useGetMyOrder';

const MyOrderPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { orderList, paging, onPageChange, refetch, isSuccess } = useGetMyOrder();

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You need to login first!!!');
      router.push(ROUTE.HOME);
    }
  }, [isLoggedIn, router]);

  return (
    <div className="container py-8">
      <ShadowContainer className="min-h-[100vh] space-y-5">
        <span className="text-xl font-semibold">My Order</span>

        <Show when={isSuccess && !orderList?.length}>
          <BookNoData emptyText="No order" className="py-20" />
        </Show>

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
