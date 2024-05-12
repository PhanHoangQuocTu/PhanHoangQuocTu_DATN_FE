import { format } from 'date-fns';
import React from 'react';

import { type IGetAllAuthorDetail } from '@/api/author';
import { Icons } from '@/assets/icons';
import { PaginationList } from '@/components/pagination';
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
import { useAuthorManagementStore } from '@/stores/AuthorManagementStore';
import { type IPaging } from '@/types';

import DeleteAuthorDialog from './DeleteAuthorDialog';
import EditAuthorDialog from './EditAuthorDialog';

interface Props {
  data: IGetAllAuthorDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
}
const AuthorManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange, refetch }) => {
  const setAuthorDeleteId = useAuthorManagementStore.use.setAuthorDeleteId();
  const setIsEdit = useAuthorManagementStore.use.setIsEdit();
  const setIsCreate = useAuthorManagementStore.use.setIsCreate();
  const setAuthorEditId = useAuthorManagementStore.use.setAuthorEditId();

  const handleDeleteAuthor = (id: number) => {
    setAuthorDeleteId(String(id));
  };

  const handleEditCategory = (id: number) => {
    setAuthorEditId(String(id));
    setIsEdit(true);
    setIsCreate(false);
  };

  return (
    <VStack>
      <div className="min-h-[35.25rem]">
        <Table className="relative w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead className="whitespace-nowrap">Gender</TableHead>
              <TableHead className="whitespace-nowrap text-center">Date Of Birth</TableHead>
              <TableHead className="whitespace-nowrap text-center">Created At</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={isLoading}>{skeletonTable(7)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((author, index) => {
                return (
                  <TableRow key={author?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{author?.name}</TableCell>

                    <TableCell className="whitespace-nowrap">{author?.gender}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {author?.dateOfBirth && format(new Date(author?.dateOfBirth), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {format(new Date(author?.createdAt), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <EditAuthorDialog authorId={author?.id} refetch={refetch}>
                          <Tooltip label="Edit">
                            <button onClick={() => handleEditCategory(author?.id)}>
                              <Icons.pencil size={16} />
                            </button>
                          </Tooltip>
                        </EditAuthorDialog>

                        <DeleteAuthorDialog authorId={author?.id} refetch={refetch}>
                          <Tooltip label="Delete">
                            <button onClick={() => handleDeleteAuthor(author?.id)}>
                              <Icons.x size={16} />
                            </button>
                          </Tooltip>
                        </DeleteAuthorDialog>
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

export default AuthorManagementTable;
