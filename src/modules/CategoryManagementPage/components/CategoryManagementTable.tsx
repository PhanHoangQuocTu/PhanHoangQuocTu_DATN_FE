import { format } from 'date-fns';
import React from 'react';

import { type CategorDetail } from '@/api/category';
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
import { useCategoryManagementStore } from '@/stores/CategoryManagementStore';
import { type IPaging } from '@/types';

import DeleteCategoryDialog from './DeleteCategoryDialog';
import EditCategoryDialog from './EditCategoryDialog';

interface Props {
  data: CategorDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
}
const CategoryManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange, refetch }) => {
  const setCategoryDeleteId = useCategoryManagementStore.use.setCategoryDeleteId();
  const setIsEdit = useCategoryManagementStore.use.setIsEdit();
  const setIsCreate = useCategoryManagementStore.use.setIsCreate();
  const setCategoryEditId = useCategoryManagementStore.use.setCategoryEditId();

  const handleDeleteCategory = (id: number) => {
    setCategoryDeleteId(String(id));
  };

  const handleEditCategory = (id: number) => {
    setCategoryEditId(String(id));
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
              <TableHead className="whitespace-nowrap">Title</TableHead>
              <TableHead className="whitespace-nowrap">Description</TableHead>
              <TableHead className="whitespace-nowrap text-center">Created At</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={isLoading}>{skeletonTable(7)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((category, index) => {
                return (
                  <TableRow key={category?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{category?.title}</TableCell>

                    <TableCell className="whitespace-nowrap">
                      <p className="max-w-96 truncate">{category?.description}</p>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {format(new Date(category?.createdAt), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <EditCategoryDialog categoryId={category?.id} refetch={refetch}>
                          <Tooltip label="Detail">
                            <button onClick={() => handleEditCategory(category?.id)}>
                              <Icons.pencil size={16} />
                            </button>
                          </Tooltip>
                        </EditCategoryDialog>

                        <DeleteCategoryDialog categoryId={category?.id} refetch={refetch}>
                          <Tooltip label="Delete">
                            <button onClick={() => handleDeleteCategory(category?.id)}>
                              <Icons.x size={16} />
                            </button>
                          </Tooltip>
                        </DeleteCategoryDialog>
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

export default CategoryManagementTable;
