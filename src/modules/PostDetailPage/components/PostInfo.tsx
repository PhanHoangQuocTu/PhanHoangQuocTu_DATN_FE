import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import { type IGetPostByIdResponse, likePostRequest } from '@/api/post';
import { Icons } from '@/assets/icons';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  data: IGetPostByIdResponse | undefined;
  refetch: () => void;
}

const PostInfo: React.FC<Props> = ({ data, refetch }) => {
  const { user, isLoggedIn } = useAuth();
  const image = React.useMemo(() => {
    if (!data?.images?.length) return '';

    return data?.images[0];
  }, [data?.images]);

  const { mutate: likePost } = useMutation(likePostRequest, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleLike = () => {
    if (!isLoggedIn) {
      toast.error('You need to login to like this post');
      return;
    }

    likePost({
      id: Number(data?.id!),
    });
  };

  const isLiked = React.useMemo(() => {
    if (!isLoggedIn) return false;

    const userData = data?.likes?.find((userLiked) => userLiked?.user?.id === user?.id);

    return !!userData;
  }, [data?.likes, isLoggedIn, user?.id]);

  return (
    <VStack>
      <span className="text-2xl font-semibold">{data?.title}</span>
      <span className="whitespace-pre-wrap text-sm font-medium">{data?.description}</span>
      <div className="relative w-full h-[35rem]">
        <Image src={image} alt={'post-banner'} fill unoptimized priority />
      </div>
      <HStack noWrap>
        <HStack noWrap pos={'apart'}>
          <HStack noWrap align={'center'} spacing={12}>
            <HStack noWrap align={'center'}>
              <span className="text-sm font-medium">{data?.likeCount}</span>
              <Icons.thumbsUp
                fill={isLiked ? 'primary' : 'none'}
                size={20}
                onClick={handleLike}
                className="cursor-pointer hover:opacity-70"
              />
            </HStack>

            <HStack noWrap align={'center'}>
              <span className="text-sm font-medium">{data?.commentCount}</span>
              <Icons.messageCirle size={20} />
            </HStack>
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default PostInfo;
