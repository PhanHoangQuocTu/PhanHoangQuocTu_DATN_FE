import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { type IGetAllPostDetail } from '@/api/post';
import { Icons } from '@/assets/icons';
import { ROUTE } from '@/types';

import { ShadowContainer } from './ShadowContainer';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { HStack, VStack } from './ui/Utilities';

interface Props {
  className?: string;
  data: IGetAllPostDetail;
}

const PostItem: React.FC<Props> = ({ className, data }) => {
  const imagePost = React.useMemo(() => {
    if (!data?.images?.length) return '';

    return data?.images[0];
  }, [data?.images]);

  const isAppovedPost = React.useMemo(() => {
    switch (data?.isApproved) {
      case true:
        return {
          label: 'Approved',
          variant: 'success',
        };
      default:
        return {
          label: 'Pending',
          variant: 'warning',
        };
    }
  }, [data?.isApproved]);

  return (
    <ShadowContainer className={className}>
      <VStack>
        <HStack noWrap pos={'apart'}>
          <span className="text-3xl font-semibold">{data?.title}</span>

          <HStack noWrap>
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={isAppovedPost.variant as any} className="min-w-16 justify-center">
              {isAppovedPost.label}
            </Badge>
          </HStack>
        </HStack>

        <span className="text-base font-medium">{data?.description}</span>

        {!!imagePost && (
          <div className="relative w-full h-96">
            <Image src={imagePost} alt={data?.title} fill unoptimized />
          </div>
        )}

        <HStack noWrap pos={'apart'}>
          <HStack noWrap spacing={12}>
            <HStack noWrap align={'center'}>
              <span className="text-sm font-medium">{data?.likeCount}</span>
              <Icons.thumbsUp size={20} />
            </HStack>
            <HStack noWrap>
              <span className="text-sm font-medium">{data?.commentCount}</span>
              <Icons.messageCirle size={16} />
            </HStack>
          </HStack>

          <Link href={`${ROUTE.POST}/${data?.id}`} target="_blank">
            <Button size={'sm'}>View Detail</Button>
          </Link>
        </HStack>
      </VStack>
    </ShadowContainer>
  );
};

export default PostItem;
