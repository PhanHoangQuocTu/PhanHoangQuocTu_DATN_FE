import { format } from 'date-fns';
import React from 'react';

import { type IGetAllPublisherDetail } from '@/api/publisher';
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
import { usePublisherManagementStore } from '@/stores/PublisherManagementStore';
import { type IPaging } from '@/types';

import DeletePublisherDialog from './DeletePublisherDialog';
import EditPublisherDialog from './EditPublisherDialog';

interface Props {
  data: IGetAllPublisherDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
}
const PublisherManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange, refetch }) => {
  const setPublisherDeleteId = usePublisherManagementStore.use.setPublisherDeleteId();
  const setIsEdit = usePublisherManagementStore.use.setIsEdit();
  const setIsCreate = usePublisherManagementStore.use.setIsCreate();
  const setPublisherEditId = usePublisherManagementStore.use.setPublisherEditId();

  const handleDeletePublisher = (id: number) => {
    setPublisherDeleteId(String(id));
  };

  const handleEditPublisher = (id: number) => {
    setPublisherEditId(String(id));
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
              <TableHead className="whitespace-nowrap">Description</TableHead>
              <TableHead className="whitespace-nowrap text-center">Created At</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={isLoading}>{skeletonTable(7)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((publisher, index) => {
                return (
                  <TableRow key={publisher?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{publisher?.name}</TableCell>

                    <TableCell className="whitespace-nowrap">
                      <p className="max-w-96 truncate">{publisher?.description}</p>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {format(new Date(publisher?.createdAt), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <EditPublisherDialog publisherId={publisher?.id} refetch={refetch}>
                          <Tooltip label="Detail">
                            <button onClick={() => handleEditPublisher(publisher?.id)}>
                              <Icons.pencil size={16} />
                            </button>
                          </Tooltip>
                        </EditPublisherDialog>

                        <DeletePublisherDialog publisherId={publisher?.id} refetch={refetch}>
                          <Tooltip label="Delete">
                            <button onClick={() => handleDeletePublisher(publisher?.id)}>
                              <Icons.x size={16} />
                            </button>
                          </Tooltip>
                        </DeletePublisherDialog>
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

export default PublisherManagementTable;
