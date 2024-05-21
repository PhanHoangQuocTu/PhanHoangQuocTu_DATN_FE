import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE } from '@/types';

const CreatePost = () => {
  const { isLoggedIn, firstLetterName } = useAuth();

  const avatarShow = React.useMemo(() => {
    if (isLoggedIn) {
      return firstLetterName;
    }

    return <Icons.user />;
  }, [firstLetterName, isLoggedIn]);

  const renderBtn = React.useMemo(() => {
    if (isLoggedIn) {
      return (
        <HStack className="pt-2" pos={'right'}>
          <Button size={'sm'} variant={'secondary'}>
            My Post
          </Button>
          <Button size={'sm'}>Create Post</Button>
        </HStack>
      );
    }

    return (
      <HStack className="pt-2" pos={'right'}>
        <span className="text-xs font-medium">
          You need to be{' '}
          <Link href={ROUTE.LOGIN} className="underline text-blue-600">
            sign in
          </Link>{' '}
          to post
        </span>
      </HStack>
    );
  }, [isLoggedIn]);

  return (
    <ShadowContainer>
      <HStack className="pb-2">
        <Avatar>{avatarShow}</Avatar>

        <button className="flex-1 hover:opacity-55">
          <Input
            fullWidth
            placeholder="Let's write something"
            size={'sm'}
            className="rounded-full pointer-events-none bg-gray-100"
          />
        </button>

        <Avatar>
          <Icons.messageCirle />
        </Avatar>
      </HStack>

      <Separator />

      {renderBtn}
    </ShadowContainer>
  );
};

export default CreatePost;
