import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { deleteCommentRequest, type IComment } from '@/api/comment';
import { Icons } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';

const CommentItem = ({ data, refetch }: { data: IComment; refetch: () => void }) => {
  const { user, isLoggedIn, accessToken } = useAuth();
  const { isAdmin } = useIsAdmin(accessToken);
  const { mutate: deleteComment } = useMutation(deleteCommentRequest, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeleteComment = () => {
    toast.success('Delete comment successfully!');
    deleteComment({ id: String(data.id) });
  };

  return (
    <HStack noWrap className="py-4 border-b border-b-border" spacing={20} align={'start'}>
      <Avatar className="w-14 h-14">
        <Icons.user />
      </Avatar>

      <VStack spacing={4} className="flex-1">
        <HStack noWrap pos={'apart'} className="flex-1">
          <VStack spacing={4}>
            <span className="text-lg font-medium">{data?.author?.email}</span>
            <span className="text-xs font-medium">{format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')}</span>
          </VStack>

          <Show when={(isLoggedIn && user?.id === data?.author?.id) || isAdmin}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Icons.settings />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleDeleteComment}>
                    <button>Delete</button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Show>
        </HStack>

        <span className="text-base">{data?.content}</span>
      </VStack>
    </HStack>
  );
};
export default CommentItem;
