import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { toast } from 'sonner';

import { type IGetAllOrder, updateStatusOrdersRequest } from '@/api/order';
import { Icons } from '@/assets/icons';
import { PaginationList } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import {
  emptyTable,
  skeletonTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip } from '@/components/ui/tooltip';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { currentNo, onMutateError, prettyNumber, roundNumber } from '@/lib/common';
import { cn } from '@/lib/utils';
import { PAYMENT_METHOD_OPTIONS } from '@/modules/CheckoutPage/types/const';
import { ORDER_STATUS_VALUE, PAYMENT_STATUS_VALUE } from '@/modules/MyOrderPage/types/const';
import { useOrderManagementStore } from '@/stores/OrderManagementStore';
import { type IPaging } from '@/types';

import OrderDetailDialog from './OrderDetailDialog';

interface ITotalPrice {
  id: number;
  price: number;
}

interface Props {
  data: IGetAllOrder[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
  totalPriceList: ITotalPrice[];
}
const OrderManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange, refetch, totalPriceList }) => {
  const setOderDetailId = useOrderManagementStore.use.setOderDetailId();

  const handleDetailOrder = (id: number) => {
    setOderDetailId(String(id));
  };

  const { mutate: updateStatusOrder } = useMutation(updateStatusOrdersRequest, {
    onSuccess: () => {
      refetch();
      toast.success('Update status order successfully!');
    },
    onError: onMutateError,
  });

  const handleUpdateStatus = (id: number, status: string) => {
    // if (status === ORDER_STATUS_VALUE.processing) {
    //   updateStatusOrder({
    //     body: {
    //       status: ORDER_STATUS_VALUE.shipped,
    //     },
    //     params: {
    //       id: String(id),
    //     },
    //   });
    //   return;
    // }

    updateStatusOrder({
      body: {
        status,
      },
      params: {
        id: String(id),
      },
    });
  };

  return (
    <VStack>
      <div className="min-h-[35.25rem]">
        <Table className="relative w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="text-center whitespace-nowrap">Order Id</TableHead>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead className="whitespace-nowrap">Phone Number</TableHead>
              <TableHead className="whitespace-nowrap text-left">Address</TableHead>
              <TableHead className="whitespace-nowrap text-center">Status</TableHead>
              <TableHead className="whitespace-nowrap text-left">Payment Method</TableHead>
              <TableHead className="whitespace-nowrap text-center">Payment Status</TableHead>
              <TableHead className="whitespace-nowrap text-center">Order At</TableHead>
              <TableHead className="whitespace-nowrap text-center">Order By Email</TableHead>
              <TableHead className="whitespace-nowrap text-center">Order By Phone Number</TableHead>
              <TableHead className="whitespace-nowrap text-right">Order Price</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={isLoading}>{skeletonTable(12)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(12)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((order, index) => {
                const orderStatus = () => {
                  switch (order?.status) {
                    case ORDER_STATUS_VALUE.processing:
                      return 'warning';
                    case ORDER_STATUS_VALUE.shipped:
                      return 'info';
                    case ORDER_STATUS_VALUE.delivered:
                      return 'success';
                    default:
                      return 'error';
                  }
                };

                const paymentStatus = () => {
                  switch (order?.isPaid) {
                    case PAYMENT_STATUS_VALUE.PAID:
                      return { value: 'success', label: 'Paid' };
                    default:
                      return { value: 'error', label: 'Unpaid' };
                  }
                };

                const totalPrice = () => {
                  return totalPriceList?.find((total) => total?.id === order?.id)?.price ?? 0;
                };

                const statusLabel = order?.status === ORDER_STATUS_VALUE.shipped ? 'Delivering' : order?.status;

                const paymentMethod = () => {
                  if (!order?.type) return '';

                  return PAYMENT_METHOD_OPTIONS.find((item) => item.value === order?.type)?.label;
                };

                return (
                  <TableRow key={order?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">{order?.id}</TableCell>

                    <TableCell className="whitespace-nowrap">{order?.shippingAddress?.name}</TableCell>

                    <TableCell className="whitespace-nowrap">{order?.shippingAddress?.phoneNumber}</TableCell>

                    <TableCell className="whitespace-nowrap text-left">{order?.shippingAddress?.address}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      <Badge variant={orderStatus()}>
                        <span className="first-letter:uppercase">{statusLabel}</span>
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-left">{paymentMethod()}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      <Badge variant={paymentStatus().value as any}>
                        <span className="first-letter:uppercase">{paymentStatus().label}</span>
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {format(new Date(order?.orderAt), 'yyyy-MM-dd HH:mm')}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">{order?.user?.email}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">{order?.user?.phoneNumber}</TableCell>

                    <TableCell className="whitespace-nowrap text-right">
                      {prettyNumber(roundNumber(String(totalPrice())))} đ
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <OrderDetailDialog
                          orderId={String(order?.id)}
                          data={order}
                          totalPrice={totalPrice()}
                          refetch={refetch}
                          status={order?.status}
                        >
                          <Tooltip label="Detail">
                            <button onClick={() => handleDetailOrder(order?.id)}>
                              <Icons.eye size={16} />
                            </button>
                          </Tooltip>
                        </OrderDetailDialog>

                        {order?.status === ORDER_STATUS_VALUE.processing && (
                          <Tooltip label="Shipping">
                            <button
                              onClick={() => handleUpdateStatus(order?.id, ORDER_STATUS_VALUE.shipped)}
                              disabled={
                                order.status === ORDER_STATUS_VALUE.cancelled ||
                                order.status === ORDER_STATUS_VALUE.delivered
                              }
                              className={cn({
                                'opacity-50':
                                  order.status === ORDER_STATUS_VALUE.cancelled ||
                                  order.status === ORDER_STATUS_VALUE.delivered,
                              })}
                            >
                              <Icons.truck size={16} />
                            </button>
                          </Tooltip>
                        )}

                        {order?.status === ORDER_STATUS_VALUE.shipped && (
                          <Tooltip label="Delivered">
                            <button
                              onClick={() => handleUpdateStatus(order?.id, ORDER_STATUS_VALUE.delivered)}
                              disabled={
                                order.status === ORDER_STATUS_VALUE.cancelled ||
                                order.status === ORDER_STATUS_VALUE.delivered
                              }
                              className={cn({
                                'opacity-50':
                                  order.status === ORDER_STATUS_VALUE.cancelled ||
                                  order.status === ORDER_STATUS_VALUE.delivered,
                              })}
                            >
                              <Icons.contact size={16} />
                            </button>
                          </Tooltip>
                        )}

                        {order?.status === ORDER_STATUS_VALUE.delivered && (
                          <Tooltip label="Delivered">
                            <button
                              onClick={() => handleUpdateStatus(order?.id, ORDER_STATUS_VALUE.delivered)}
                              disabled={
                                order.status === ORDER_STATUS_VALUE.cancelled ||
                                order.status === ORDER_STATUS_VALUE.delivered
                              }
                              className={cn({
                                'opacity-50':
                                  order.status === ORDER_STATUS_VALUE.cancelled ||
                                  order.status === ORDER_STATUS_VALUE.delivered,
                              })}
                            >
                              <Icons.check size={16} />
                            </button>
                          </Tooltip>
                        )}

                        {order?.status === ORDER_STATUS_VALUE.cancelled && (
                          <Tooltip label="Cancelled">
                            <button
                              onClick={() => handleUpdateStatus(order?.id, ORDER_STATUS_VALUE.delivered)}
                              disabled={
                                order.status === ORDER_STATUS_VALUE.cancelled ||
                                order.status === ORDER_STATUS_VALUE.delivered
                              }
                              className={cn({
                                'opacity-50':
                                  order.status === ORDER_STATUS_VALUE.cancelled ||
                                  order.status === ORDER_STATUS_VALUE.delivered,
                              })}
                            >
                              <Icons.x size={16} color="red" />
                            </button>
                          </Tooltip>
                        )}
                      </HStack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Show>
          </TableBody>
        </Table>
      </div>

      {data?.length > 0 && (
        <PaginationList
          pageSize={paging.limit}
          currentPage={paging.page}
          onPageChange={(newPage) => onPageChange(newPage)}
          siblingCount={1}
          totalCount={paging.total ?? 0}
        />
      )}
    </VStack>
  );
};

export default OrderManagementTable;
