import Image from 'next/image';
import React from 'react';

import { type IGetPostByIdResponse } from '@/api/post';
import { VStack } from '@/components/ui/Utilities';

interface Props {
  data: IGetPostByIdResponse | undefined;
}

const PostInfo: React.FC<Props> = ({ data }) => {
  const image = React.useMemo(() => {
    if (!data?.images?.length) return '';

    return data?.images[0];
  }, [data?.images]);

  return (
    <VStack>
      <span className="text-2xl font-semibold">{data?.title}</span>
      <span className="whitespace-pre-wrap text-sm font-medium">{data?.description}</span>
      <div className="relative w-full h-96">
        <Image src={image} alt={'post-banner'} fill unoptimized priority />
      </div>
    </VStack>
  );
};

export default PostInfo;
