import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Icons } from '@/assets/icons';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/stores/PostStore';
import { ROUTE } from '@/types';

const CreatePost = () => {
  const router = useRouter();
  const { isLoggedIn, firstLetterName } = useAuth();
  const setIsCreate = usePostStore.use.setIsCreate();
  const setIsEdit = usePostStore.use.setIsEdit();
  const setPostEditId = usePostStore.use.setPostEditId();

  const handleOpenCreatePostDialog = React.useCallback(() => {
    setIsCreate(true);
    setIsEdit(false);
    setPostEditId('');
  }, [setIsCreate, setIsEdit, setPostEditId]);

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
          <Button size={'sm'} variant={'secondary'} onClick={() => router.push(ROUTE.PROFILE)}>
            My Post
          </Button>
          <Button size={'sm'} onClick={handleOpenCreatePostDialog}>
            Create Post
          </Button>
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
  }, [handleOpenCreatePostDialog, isLoggedIn, router]);

  return (
    <ShadowContainer>
      <HStack className="pb-2">
        <Avatar>{avatarShow}</Avatar>

        <button
          className={cn('flex-1', {
            'hover:opacity-55': isLoggedIn,
            'pointer-events-none': !isLoggedIn,
          })}
          onClick={handleOpenCreatePostDialog}
        >
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
