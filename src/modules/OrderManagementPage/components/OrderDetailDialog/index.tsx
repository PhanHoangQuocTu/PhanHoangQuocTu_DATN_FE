import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import { cancelOrdersRequest, type IGetMyOrderDetail } from '@/api/order';
import { Icons } from '@/assets/icons';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/ui/Utilities';
import { prettyNumber, roundNumber } from '@/lib/common';
import { PAYMENT_METHOD_OPTIONS } from '@/modules/CheckoutPage/types/const';
import { ORDER_STATUS_VALUE, PAYMENT_STATUS_OPTION } from '@/modules/MyOrderPage/types/const';
import { useOrderManagementStore } from '@/stores/OrderManagementStore';
import { type FCC } from '@/types';

import OrderDialogTitle from './OrderDialogTitle';
import { OrderInfo } from './OrderInfo';

interface Props {
  orderId: string;
  data: IGetMyOrderDetail;
  totalPrice: number;
  refetch: () => void;
  status: string;
}
const OrderDetailDialog: FCC<Props> = ({ children, orderId, data, totalPrice, refetch, status }) => {
  const orderDetailId = useOrderManagementStore.use.orderDetailId();
  const setOderDetailId = useOrderManagementStore.use.setOderDetailId();

  const handleCloseDialog = () => {
    setOderDetailId('');
  };

  const paymentMethod = React.useMemo(() => {
    if (!data?.type) return '';

    return PAYMENT_METHOD_OPTIONS.find((item) => item.value === data?.type)?.label || '';
  }, [data?.type]);

  const paymentStatus = React.useMemo(() => {
    if (!data?.isPaid) return '';

    return PAYMENT_STATUS_OPTION.find((item) => item.value === data?.isPaid)?.label || '';
  }, [data?.isPaid]);

  const orderStatus = React.useMemo(() => {
    switch (data?.status) {
      case ORDER_STATUS_VALUE.processing:
        return 'warning';
      case ORDER_STATUS_VALUE.shipped:
        return 'info';
      case ORDER_STATUS_VALUE.delivered:
        return 'success';
      default:
        return 'error';
    }
  }, [data?.status]);

  const { mutate: cancelOrder } = useMutation(cancelOrdersRequest, {
    onSuccess: () => {
      refetch();
      toast.success('Cancel order successfully');
      handleCloseDialog();
    },
  });

  const handleCancelOrder = () => {
    cancelOrder({
      id: String(orderId),
    });
  };

  const statusLabel = data?.status === ORDER_STATUS_VALUE.shipped ? 'Delivering' : data?.status;

  return (
    <Dialog open={Number(orderDetailId) === Number(orderId)} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Order Detail</AlertDialogHeader>

        <VStack className="max-h-[25rem] overflow-auto">
          <OrderDialogTitle title="Shipping Address" icon={<Icons.mapPin />} />

          <VStack>
            <OrderInfo title="Order Id" data={String(data?.shippingAddress?.id)} />
            <OrderInfo title="Name" data={data?.shippingAddress?.name} />
            <OrderInfo title="Phone Number" data={data?.shippingAddress?.phoneNumber} />
            <OrderInfo title="Address" data={data?.shippingAddress?.address} />
            <OrderInfo title="City" data={data?.shippingAddress?.city} />
            <OrderInfo title="Post Code" data={data?.shippingAddress?.postCode} />
          </VStack>

          <Separator />

          <OrderDialogTitle title="Payment Detail" icon={<Icons.receipt />} />

          <VStack>
            <OrderInfo title="Payment Method" data={paymentMethod} />
            <OrderInfo title="Payment Status" data={paymentStatus} />
          </VStack>

          <Separator />

          <OrderDialogTitle title="Order Infomation" icon={<Icons.scrollText />} />

          <VStack>
            <OrderInfo title="Order Books" data="" />

            <VStack className="ml-5">
              {data?.products?.map((book) => {
                const priceOrigin = book?.product_unit_price || 0;
                const priceAfterDiscount = Number(priceOrigin) - (Number(priceOrigin) * Number(book?.discount)) / 100;
                const imageUrl = book?.product?.images?.length ? book?.product?.images[0] : '';

                return (
                  <HStack key={book?.id}>
                    <Image src={imageUrl} alt={book?.product?.title} width={60} height={60} />

                    <VStack justify={'between'} className="flex-1 h-full">
                      <span className="text-sm font-medium">{book?.title}</span>

                      <HStack noWrap className="text-sm font-medium">
                        <span className="text-destructive">
                          {prettyNumber(roundNumber(String(priceAfterDiscount)))} đ
                        </span>

                        <span> x {book?.product_quantity}</span>
                      </HStack>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>
            <OrderInfo title="Total Price" data={`${prettyNumber(roundNumber(String(totalPrice)))} đ`} />
            <OrderInfo
              title="Order Status"
              data={
                <Badge variant={orderStatus}>
                  <span className="first-letter:uppercase">{statusLabel}</span>
                </Badge>
              }
            />
          </VStack>
        </VStack>

        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button
              disabled={
                status === ORDER_STATUS_VALUE.cancelled ||
                status === ORDER_STATUS_VALUE.delivered ||
                status === ORDER_STATUS_VALUE.shipped
              }
              onClick={handleCancelOrder}
              variant={'destructive'}
            >
              Cancel Order
            </Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
