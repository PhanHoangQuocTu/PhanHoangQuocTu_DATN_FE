import { format } from 'date-fns';
import React from 'react';

import { type IGetMyOrderDetail } from '@/api/order';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HStack, VStack } from '@/components/ui/Utilities';
import { prettyNumber, roundNumber } from '@/lib/common';
import { useMyOrderStore } from '@/stores/MyOrderStore';

import { useGetMyOrder } from '../hooks/useGetMyOrder';
import { ORDER_STATUS_VALUE } from '../types/const';
import MyOrderDialog from './MyOrderDialog';

interface Props {
  data: IGetMyOrderDetail;
  refetch: () => void;
}
const MyOrderItem: React.FC<Props> = ({ data, refetch }) => {
  const setMyOderDetailId = useMyOrderStore.use.setMyOderDetailId();

  const { totalPriceList } = useGetMyOrder();

  const totalPrice = React.useMemo(() => {
    return totalPriceList?.find((total) => total?.id === data?.id)?.price ?? 0;
  }, [data?.id, totalPriceList]);

  const statusVariant = React.useMemo(() => {
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

  const handleClickViewDetail = () => {
    setMyOderDetailId(String(data?.id));
  };

  return (
    <ShadowContainer className="flex justify-between p-5">
      <VStack>
        <span>Order Id: {data.id}</span>
        <span>Client: {data?.shippingAddress?.name}</span>
        <span>Price: {prettyNumber(roundNumber(String(totalPrice)))} đ</span>

        <HStack noWrap spacing={12}>
          <span>Status:</span>
          <Badge variant={statusVariant}>
            <span className="first-letter:uppercase">{data?.status}</span>
          </Badge>
        </HStack>
      </VStack>

      <VStack justify={'between'} align={'end'}>
        <span>Order At: {format(new Date(data?.orderAt), 'yyyy-MM-dd HH:mm')}</span>

        <Button onClick={handleClickViewDetail} className="w-fit">
          View Detail
        </Button>

        <MyOrderDialog orderId={String(data?.id)} data={data} totalPrice={totalPrice} refetch={refetch} />
      </VStack>
    </ShadowContainer>
  );
};

export default MyOrderItem;
