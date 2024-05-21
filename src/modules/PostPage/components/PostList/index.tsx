import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';

import CreatePost from './CreatePost';

const PostList = () => {
  return (
    <VStack className="col-span-2">
      <CreatePost />

      <ShadowContainer className="flex-1"></ShadowContainer>
    </VStack>
  );
};

export default PostList;
