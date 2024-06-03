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
import { useUserManagementStore } from '@/stores/UserManagementStore';
import { type IPaging } from '@/types';

import AddRoleDialog from './AddRoleDialog';
import DeleteUserDialog from './DeleteUserDialog';
import DetailUserDialog from './DetailUserDialog';
import RestoreUserDialog from './RestoreUserDialog';

interface Props {
  data: IUserGetAllDetail[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
  isDeleted?: boolean;
}
const UserManagementTable: React.FC<Props> = ({
  data,
  paging,
  isLoading,
  onPageChange,
  refetch,
  isDeleted = false,
}) => {
  const setUserDeleteId = useUserManagementStore.use.setUserDeleteId();
  const setUserDetailId = useUserManagementStore.use.setUserDetailId();
  const setUserRestoreId = useUserManagementStore.use.setUserRestoreId();
  const setUserAddRoleId = useUserManagementStore.use.setUserAddRoleId();

  const handleDeleteUser = (id: number) => {
    setUserDeleteId(String(id));
  };

  const handleDetailUser = (id: number) => {
    setUserDetailId(String(id));
  };

  const handleRestoreUser = (id: number) => {
    setUserRestoreId(String(id));
  };

  const handleAddRole = (id: number) => {
    setUserAddRoleId(String(id));
  };

  return (
    <VStack>
      <div className="min-h-[35.25rem]">
        <Table className="relative w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead className="whitespace-nowrap">Email</TableHead>
              <TableHead className="whitespace-nowrap">Phone Number</TableHead>
              <TableHead className="whitespace-nowrap text-center">Gender</TableHead>
              <TableHead className="whitespace-nowrap text-center">Date of Birth</TableHead>
              <TableHead className="whitespace-nowrap text-center">Active</TableHead>
              {isDeleted && <TableHead className="whitespace-nowrap text-center">Deleted At</TableHead>}
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

                const isAdmin = user?.roles.some((role) => role === 'admin');

                return (
                  <TableRow key={user?.id}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{fullName}</TableCell>

                    <TableCell className="whitespace-nowrap">{user?.email}</TableCell>

                    <TableCell className="whitespace-nowrap">{user?.phoneNumber}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">{user?.gender}</TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      {user?.dateOfBirth && format(new Date(user?.dateOfBirth), 'dd/MM/yyyy')}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-center">
                      <Badge variant={getActive().variant as any} className="min-w-16 justify-center">
                        {getActive().label}
                      </Badge>
                    </TableCell>

                    {isDeleted && (
                      <TableCell className="whitespace-nowrap text-center">
                        {user?.deletedAt && format(new Date(user?.deletedAt), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                    )}

                    <TableCell className="sticky right-0 whitespace-nowrap text-center">
                      <HStack noWrap spacing={8} pos={'center'}>
                        <DetailUserDialog userId={user?.id}>
                          <Tooltip label="Detail">
                            <button onClick={() => handleDetailUser(user?.id)}>
                              <Icons.pencil size={16} />
                            </button>
                          </Tooltip>
                        </DetailUserDialog>

                        {!isDeleted && (
                          <DeleteUserDialog userId={user?.id} refetch={refetch}>
                            <Tooltip label="Delete">
                              <button onClick={() => handleDeleteUser(user?.id)}>
                                <Icons.x size={16} />
                              </button>
                            </Tooltip>
                          </DeleteUserDialog>
                        )}

                        {!isDeleted && !isAdmin && (
                          <AddRoleDialog userId={user?.id} refetch={refetch}>
                            <Tooltip label="Add Role Admin">
                              <button onClick={() => handleAddRole(user?.id)}>
                                <Icons.userCog size={16} />
                              </button>
                            </Tooltip>
                          </AddRoleDialog>
                        )}

                        {isDeleted && (
                          <RestoreUserDialog userId={user?.id} refetch={refetch}>
                            <Tooltip label="Restore">
                              <button onClick={() => handleRestoreUser(user?.id)}>
                                <Icons.rotateCw size={16} />
                              </button>
                            </Tooltip>
                          </RestoreUserDialog>
                        )}
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
