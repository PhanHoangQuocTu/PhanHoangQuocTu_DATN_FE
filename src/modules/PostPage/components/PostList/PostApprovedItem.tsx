import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

import { type IGetAllPostDetail } from '@/api/post';
import { Icons } from '@/assets/icons';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { HStack, VStack } from '@/components/ui/Utilities';

interface Props {
  post: IGetAllPostDetail;
}

const PostApprovedItem: React.FC<Props> = ({ post }) => {
  const imagePost = React.useMemo(() => {
    if (!post?.images?.length) return '';

    return post?.images[0];
  }, [post?.images]);

  const renderImage = React.useMemo(() => {
    if (!imagePost)
      return (
        <HStack noWrap className="w-40 h-40 min-w-40 border border-border rounded-md" pos={'center'} align={'center'}>
          <Icons.file size={40} />
        </HStack>
      );

    return <Image src={imagePost} alt="image-post" width={160} height={160} className="shrink-0 min-w-40" />;
  }, [imagePost]);
  return (
    <ShadowContainer>
      <HStack noWrap spacing={20} align={'default'}>
        {renderImage}

        <VStack justify={'between'} className="flex-1">
          <VStack className="w-full">
            <span className="text-3xl font-semibold">{post?.title}</span>

            <span className="text-base font-medium break-words w-full max-w-full text-wrap truncate line-clamp-2">
              {post?.description}
            </span>

            <span className="text-xs font-medium">
              Post At: {format(new Date(post?.createdAt), 'dd/MM/yyyy HH:mm')}
            </span>
          </VStack>

          <HStack noWrap pos={'apart'}>
            <HStack noWrap>
              <span className="text-xs font-medium">{post?.commentCount}</span>
              <Icons.messageCirle size={20} />
            </HStack>

            <Button size={'sm'}>View Detail</Button>
          </HStack>
        </VStack>
      </HStack>
    </ShadowContainer>
  );
};

export default PostApprovedItem;
