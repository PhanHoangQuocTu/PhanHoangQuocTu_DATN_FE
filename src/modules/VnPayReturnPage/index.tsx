import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { useGetResultVnPaQuery } from '@/api/order/queries';
import { Icons } from '@/assets/icons';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { VStack } from '@/components/ui/Utilities';
import { ROUTE } from '@/types';

const VnPayReturnPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const responseCode = searchParams.get('vnp_ResponseCode');
  const transactionNo = searchParams.get('vnp_TransactionNo');
  const transactionStatus = searchParams.get('vnp_TransactionStatus');

  const { data, isSuccess, isLoading } = useGetResultVnPaQuery({
    variables: {
      orderId: orderId || '',
      vnp_ResponseCode: responseCode || '',
      vnp_TransactionNo: transactionNo || '',
      vnp_TransactionStatus: transactionStatus || '',
    },
    enabled: !!orderId && !!responseCode && !!transactionNo && !!transactionStatus,
  });

  const handleNavigate = React.useCallback(() => {
    router.replace(ROUTE.MY_ORDER);
  }, [router]);

  const renderStatus = React.useMemo(() => {
    if (isLoading) {
      return (
        <VStack align={'center'} className="min-w-96">
          <Spinner size="52" className="" />
          <span className="text-3xl font-medium">Wait a minute</span>
          <span className="text-xl font-medium">Transaction is processing</span>
        </VStack>
      );
    }

    if (isSuccess && data?.status === 200) {
      return (
        <VStack align={'center'} className="min-w-96">
          <Icons.check size="52" color="#4CAF50" />
          <span className="text-3xl font-medium">Order successfully</span>
          <Button onClick={handleNavigate} fullWidth className="text-xl font-medium">
            Go to my order
          </Button>
        </VStack>
      );
    }

    return (
      <VStack align={'center'} className="min-w-96">
        <Icons.x size="52" color="#F44336" />
        <span className="text-3xl font-medium">Order failed</span>
        <Button onClick={handleNavigate} fullWidth className="text-xl font-medium">
          Go to my order
        </Button>
      </VStack>
    );
  }, [data?.status, handleNavigate, isLoading, isSuccess]);

  return (
    <div className="container py-20 flex justify-center">
      <ShadowContainer className="w-fit">{renderStatus}</ShadowContainer>
    </div>
  );
};

export default VnPayReturnPage;
