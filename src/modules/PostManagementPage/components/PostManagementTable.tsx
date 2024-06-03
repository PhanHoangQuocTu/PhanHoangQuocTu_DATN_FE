import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { type IGetAllPostDetail } from '@/api/post';
import { Icons } from '@/assets/icons';
import { PaginationList } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import {
  emptyTable,
  skeletonTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip } from '@/components/ui/tooltip';
import { HStack, Show, VStack } from '@/components/ui/Utilities';
import { currentNo } from '@/lib/common';
import { cn } from '@/lib/utils';
import { usePostManagementStore } from '@/stores/PostManagementStore';
import { type IPaging, ROUTE } from '@/types';

import DeletePostDialog from './DeletePostDialog';
import PostApproveDialog from './PostApproveDialog';

interface Props {
  data: IGetAllPostDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
}
const PostManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange, refetch }) => {
  const setPostApproveId = usePostManagementStore.use.setPostApproveId();
  const setPostDeleteId = usePostManagementStore.use.setPostDeleteId();

  const handleApprovePost = (postId: string) => {
    setPostApproveId(postId);
  };

  const handleDeletePost = (postId: string) => {
    setPostDeleteId(postId);
  };
  return (
    <VStack>
      <div className="min-h-[35.25rem]">
        <Table className="relative w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="whitespace-nowrap">Title</TableHead>
              <TableHead className="whitespace-nowrap">Description</TableHead>
              <TableHead className="whitespace-nowrap">Author</TableHead>
              <TableHead className="whitespace-nowrap text-center">Comments</TableHead>
              <TableHead className="whitespace-nowrap text-center">Likes</TableHead>
              <TableHead className="whitespace-nowrap text-center">Status</TableHead>
              <TableHead className="whitespace-nowrap text-center">Created At</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <Show when={isLoading}>{skeletonTable(7)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((post, index) => {
                const isAppovedPost = () => {
                  switch (post?.isApproved) {
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
                };
                return (
                  <TableRow key={post?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{post?.title}</TableCell>

                    <TableCell className="whitespace-nowrap">
                      <p className="max-w-96 truncate">{post?.description}</p>
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{post?.author?.email}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {post?.commentCount} {post?.commentCount === 1 ? 'comment' : 'comments'}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {post?.likeCount} {post?.likeCount === 1 ? 'like' : 'likes'}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      <Badge variant={isAppovedPost().variant as any} className="min-w-16 justify-center">
                        {isAppovedPost().label}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {format(new Date(post?.createdAt), 'dd/MM/yyyy HH:mm')}
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <Tooltip label="Preview">
                          <Link href={`${ROUTE.POST}/${post?.id}`} target="_blank">
                            <Icons.eye size={16} />
                          </Link>
                        </Tooltip>

                        <Show when={!post?.isApproved}>
                          <PostApproveDialog postId={post?.id} refetch={refetch}>
                            <Tooltip label="Approve">
                              <button
                                disabled={post?.isApproved}
                                className={cn({
                                  'opacity-60': post?.isApproved,
                                })}
                                onClick={() => handleApprovePost(String(post?.id))}
                              >
                                <Icons.check size={16} color="green" />
                              </button>
                            </Tooltip>
                          </PostApproveDialog>
                        </Show>

                        <DeletePostDialog postId={post?.id} refetch={refetch}>
                          <Tooltip label="Delete">
                            <button onClick={() => handleDeletePost(String(post?.id))}>
                              <Icons.x size={16} color="red" />
                            </button>
                          </Tooltip>
                        </DeletePostDialog>
                      </HStack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Show>
          </TableBody>
        </Table>
      </div>

      {data?.length > 0 && (
        <PaginationList
          pageSize={paging.limit}
          currentPage={paging.page}
          onPageChange={(newPage) => onPageChange(newPage)}
          siblingCount={1}
          totalCount={paging.total ?? 0}
        />
      )}
    </VStack>
  );
};

export default PostManagementTable;
