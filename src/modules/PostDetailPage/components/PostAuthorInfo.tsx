import Link from 'next/link';
import React from 'react';

import { type IGetAllPostAuthor, type IGetPostByIdResponse } from '@/api/post';
import { Icons } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip } from '@/components/ui/tooltip';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { usePostStore } from '@/stores/PostStore';

interface Props {
  data: IGetPostByIdResponse | undefined;
}
const PostAuthorInfo: React.FC<Props> = ({ data }) => {
  const { isLoggedIn, user } = useAuth();
  const setPostEditId = usePostStore.use.setPostEditId();
  const setPostDeleteId = usePostStore.use.setPostDeleteId();
  const setIsCreate = usePostStore.use.setIsCreate();
  const setIsEdit = usePostStore.use.setIsEdit();

  const handleEditPost = () => {
    setPostEditId(String(data?.id));
    setIsEdit(true);
    setIsCreate(false);
  };

  const handleDeletePost = () => {
    setPostDeleteId(String(data?.id));
  };

  return (
    <HStack noWrap pos={'apart'}>
      <Tooltip label={<InfoTooltip user={data?.author} />}>
        <HStack noWrap spacing={20}>
          <Avatar>
            <Icons.user />
          </Avatar>
          <span className="text-lg font-medium">{data?.author?.email}</span>
        </HStack>
      </Tooltip>

      <Show when={isLoggedIn && user?.id === data?.author?.id}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Icons.settings />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEditPost}>
                <button>Edit</button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeletePost}>
                <button>Delete</button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Show>
    </HStack>
  );
};

export default PostAuthorInfo;

const InfoTooltip = ({ user }: { user: IGetAllPostAuthor | undefined }) => {
  return (
    <HStack noWrap className="py-2" spacing={20}>
      <Avatar className="w-16 h-16">
        <Icons.user />
      </Avatar>

      <VStack spacing={0}>
        <span className="text-lg font-medium">{user?.email || ''}</span>
        <HStack noWrap>
          <span>active: </span>
          {user?.isActice ? <Icons.check color="green" /> : <Icons.x color="red" /> || ''}
        </HStack>
        <Link href={`mailto:${user?.email || ''}`}>
          <Button size={'xs'}>Contact</Button>
        </Link>
      </VStack>
    </HStack>
  );
};
