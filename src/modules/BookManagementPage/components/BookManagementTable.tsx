import { format } from 'date-fns';
import React from 'react';

import { type IGetAllProductDetail } from '@/api/product';
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
import { currentNo, prettyNumber, roundNumber } from '@/lib/common';
import { useBookManagementStore } from '@/stores/BookManagementStore';
import { type IPaging } from '@/types';

import DeleteBookDialog from './DeleteBookDialog';
import EditBookDialog from './EditBookDialog';

interface Props {
  data: IGetAllProductDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
}
const BookManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange, refetch }) => {
  const setBookEditId = useBookManagementStore.use.setBookEditId();
  const setIsEdit = useBookManagementStore.use.setIsEdit();
  const setProductImg = useBookManagementStore.use.setProductImg();
  const setBookDeleteId = useBookManagementStore.use.setBookDeleteId();

  const handleEditBook = (id: number) => {
    setBookEditId(String(id));
    setIsEdit(true);
    setProductImg(null);
  };

  const handleDeleteBook = (id: number) => {
    setBookDeleteId(String(id));
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
              <TableHead className="whitespace-nowrap text-right">Price</TableHead>
              <TableHead className="whitespace-nowrap text-right">Discount</TableHead>
              <TableHead className="whitespace-nowrap text-center">Stock</TableHead>
              <TableHead className="whitespace-nowrap">Author</TableHead>
              <TableHead className="whitespace-nowrap">Category</TableHead>
              <TableHead className="whitespace-nowrap">Publisher</TableHead>
              <TableHead className="whitespace-nowrap text-center">Created At</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <Show when={isLoading}>{skeletonTable(7)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((book, index) => {
                return (
                  <TableRow key={book?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{book?.title}</TableCell>

                    <TableCell className="whitespace-nowrap">
                      <p className="max-w-96 truncate">{book?.description}</p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right">
                      {prettyNumber(roundNumber(book?.price))} đ
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right">
                      {prettyNumber(roundNumber(book?.discount))} %
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">{book?.stock}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {book?.author ? book?.author?.name : 'Not Available'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {book?.category ? book?.category?.title : 'Not Available'}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {book?.publisher ? book?.publisher?.name : 'Not Available'}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {format(new Date(book?.createdAt), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <EditBookDialog bookId={book.id} refetch={refetch}>
                          <Tooltip label="Edit">
                            <button onClick={() => handleEditBook(book.id)}>
                              <Icons.pencil size={16} />
                            </button>
                          </Tooltip>
                        </EditBookDialog>

                        <DeleteBookDialog bookId={book.id} refetch={refetch}>
                          <Tooltip label="Delete">
                            <button onClick={() => handleDeleteBook(book.id)}>
                              <Icons.x size={16} />
                            </button>
                          </Tooltip>
                        </DeleteBookDialog>
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

export default BookManagementTable;
