import React from 'react';

import { type IMonthlyReport } from '@/api/order';
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
import { Show, VStack } from '@/components/ui/Utilities';
import { currentNo, prettyNumber, roundNumber } from '@/lib/common';
import { type IPaging } from '@/types';

interface Props {
  data: IMonthlyReport[];
  paging: IPaging;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const MonthlyReportTable: React.FC<Props> = ({ data, paging, isLoading, onPageChange }) => {
  return (
    <VStack>
      <div className="min-h-[35.25rem]">
        <Table className="relative w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="whitespace-nowrap">Month</TableHead>
              <TableHead className="whitespace-nowrap text-right">Total Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={isLoading}>{skeletonTable(3)}</Show>
            <Show when={!isLoading && data.length === 0}>{emptyTable(3)}</Show>
            <Show when={!isLoading && data.length > 0}>
              {data.map((report, index) => {
                return (
                  <TableRow key={`${report?.month}-${index}`}>
                    <TableCell className="whitespace-nowrap text-center">
                      {currentNo(index, paging.page, paging.limit)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">{report?.month}</TableCell>

                    <TableCell className="whitespace-nowrap text-right">
                      {prettyNumber(roundNumber(String(report?.totalRevenue)))} đ
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

export default MonthlyReportTable;
