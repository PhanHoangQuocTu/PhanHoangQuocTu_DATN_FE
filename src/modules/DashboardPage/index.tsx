import React from 'react';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useGetAllOrder } from '@/hooks/order/useGetAllOrder';
import { useGetAllBook } from '@/hooks/product/useGetAllBook';
import { useGetAllUser } from '@/hooks/user/useGetAllUser';
import { prettyNumber, roundNumber } from '@/lib/common';
import { type NextPageWithLayout } from '@/types';

import { useGetMonthlyReport } from '../MonthlyReportPage/hooks/useGetMonthlyReport';
import DashboardBox from './components/DashboardBox';

const DashboardPage: NextPageWithLayout = () => {
  const { meta: metaBook } = useGetAllBook();
  const { meta: metaUser } = useGetAllUser();
  const { meta: metaOrder } = useGetAllOrder();
  const { totalRevenue } = useGetMonthlyReport();
  return (
    <div>
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
          value={`${prettyNumber(roundNumber(String(totalRevenue)))} đ`}
          className="col-span-1 bg-gradient-to-br from-[#38ef7d] to-[#11998e]"
        />
      </div>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
