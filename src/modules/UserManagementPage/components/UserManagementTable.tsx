import React from 'react';

import { emptyTable, Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserManagementTable = () => {
  return (
    <Table className="relative w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">No.</TableHead>
          <TableHead className="whitespace-nowrap">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="whitespace-nowrap text-center">Gender</TableHead>
          <TableHead className="whitespace-nowrap text-center">Date of Birth</TableHead>
          <TableHead className="whitespace-nowrap text-center">Active</TableHead>
          <TableHead className="sticky right-0 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* <Show when={isLoading}>{skeletonTable(7)}</Show>
        <Show when={!isLoading && data.length === 0}>{emptyTable(7)}</Show> */}
        {emptyTable(7)}
        {/* <Show when={!isLoading && data.length > 0}> */}
        {/* {data.map((item, index) => ( */}
        {/* <TableRow>
          <TableCell></TableCell>

          <TableCell className="whitespace-nowrap text-center"></TableCell>

          <TableCell className="whitespace-nowrap"></TableCell>

          <TableCell className="whitespace-nowrap"></TableCell>

          <TableCell className="whitespace-nowrap text-center"></TableCell>

          <TableCell className="whitespace-nowrap text-center"></TableCell>

          <TableCell className="sticky right-0 whitespace-nowrap text-center"></TableCell>
        </TableRow> */}
        {/* ))} */}
        {/* </Show> */}
      </TableBody>
    </Table>
  );
};

export default UserManagementTable;
