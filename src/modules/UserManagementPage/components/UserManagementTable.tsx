import { format } from 'date-fns';
import React from 'react';

import { type IUserGetAllDetail } from '@/api/user';
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
import { type IPaging } from '@/types';

interface Props {
  data: IUserGetAllDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}
const UserManagementTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange }) => {
  return (
    <VStack>
      <div className="min-h-[34.375rem]">
        <Table className="relative w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead className="whitespace-nowrap">Email</TableHead>
              <TableHead className="whitespace-nowrap text-center">Gender</TableHead>
              <TableHead className="whitespace-nowrap text-center">Date of Birth</TableHead>
              <TableHead className="whitespace-nowrap text-center">Active</TableHead>
              <TableHead className="sticky right-0 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={isLoading}>{skeletonTable(7)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((user, index) => {
                const fullName = `${user?.firstName} ${user?.lastName}`;
                const getActive = () => {
                  switch (user?.isActice) {
                    case true:
                      return {
                        label: 'Active',
                        variant: 'success',
                      };
                    default:
                      return {
                        label: 'Inactive',
                        variant: 'error',
                      };
                  }
                };

                return (
                  <TableRow key={user?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{fullName}</TableCell>

                    <TableCell className="whitespace-nowrap">{user?.email}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">{user?.gender}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {user?.DateOfBirth && format(new Date(user?.DateOfBirth), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      <Badge variant={getActive().variant as any} className="min-w-16 justify-center">
                        {getActive().label}
                      </Badge>
                    </TableCell>

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8}>
                        <Tooltip label="Edit">
                          <button>
                            <Icons.pencil size={16} />
                          </button>
                        </Tooltip>

                        <Tooltip label="Delete">
                          <button>
                            <Icons.x size={16} />
                          </button>
                        </Tooltip>
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

export default UserManagementTable;
