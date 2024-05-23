import React from 'react';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';
import { useGetAllOrder } from '@/hooks/order/useGetAllOrder';
import { useGetAllBook } from '@/hooks/product/useGetAllBook';
import { useGetAllUser } from '@/hooks/user/useGetAllUser';
import { prettyNumber, roundNumber } from '@/lib/common';
import { type NextPageWithLayout } from '@/types';

import { useGetMonthlyReport } from '../MonthlyReportPage/hooks/useGetMonthlyReport';
import DashboardBox from './components/DashboardBox';
import RevenueChart from './components/RevenueChart';
import UserChart from './components/UserChart';

const DashboardPage: NextPageWithLayout = () => {
  const { meta: metaBook } = useGetAllBook();
  const { meta: metaUser } = useGetAllUser();
  const { meta: metaOrder } = useGetAllOrder();
  const { totalRevenue, chartData } = useGetMonthlyReport();
  return (
    <VStack>
      <div className="grid grid-cols-4 gap-3">
        <DashboardBox
          title="Total Users"
          value={`${metaUser?.totalItems} users`}
          className="col-span-1 bg-gradient-to-br from-[#a8c0ff] to-[#3f2b96]"
        />
        <DashboardBox
          title="Total Books"
          value={`${metaBook?.totalItems} books`}
          className="col-span-1 bg-gradient-to-br from-[#DA4453] to-[#89216B]"
        />
        <DashboardBox
          title="Total Orders"
          value={`${metaOrder?.totalItems} orders`}
          className="col-span-1 bg-gradient-to-br from-[#a2ab58] to-[#636363]"
        />
        <DashboardBox
          title="Total Revenue "
          value={`${prettyNumber(roundNumber(String(totalRevenue || 0)))} đ`}
          className="col-span-1 bg-gradient-to-br from-[#38ef7d] to-[#11998e]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-96">
        <ShadowContainer className="space-y-10 col-span-1">
          <span className="text-2xl font-semibold">User Management</span>

          <UserChart />
        </ShadowContainer>

        <ShadowContainer className="space-y-10 col-span-1">
          <span className="text-2xl font-semibold">Revenue Management</span>

          <RevenueChart data={chartData} />
        </ShadowContainer>
      </div>
    </VStack>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
