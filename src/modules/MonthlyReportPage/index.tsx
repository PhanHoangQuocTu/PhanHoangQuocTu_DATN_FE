import React from 'react';

import { MonthlyReportLayout } from '@/components/layouts/MonthlyReportLayout';
import { type NextPageWithLayout } from '@/types';

import MonthlyReportTable from './components/MonthlyReportTable';
import { useGetMonthlyReport } from './hooks/useGetMonthlyReport';

const MonthlyReportPage: NextPageWithLayout = () => {
  const { monthlyList, isLoading, onPageChange, paging } = useGetMonthlyReport();
  return <MonthlyReportTable data={monthlyList} isLoading={isLoading} onPageChange={onPageChange} paging={paging} />;
};

export default MonthlyReportPage;

MonthlyReportPage.getLayout = (page) => {
  return <MonthlyReportLayout>{page}</MonthlyReportLayout>;
};
