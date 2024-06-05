import React from 'react';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';
import { useGetAllAuthor } from '@/hooks/author/useGetAllAuthor';
import { useGetAllCategory } from '@/hooks/category/useGetAllCategory';
import { useGetAllOrder } from '@/hooks/order/useGetAllOrder';
import { useGetAllPost } from '@/hooks/post/useGetAllPost';
import { useGetAllBook } from '@/hooks/product/useGetAllBook';
import { useGetAllPublisher } from '@/hooks/publisher/useGetAllPublisher';
import { useGetAllAdmin } from '@/hooks/user/useGetAllAdmin';
import { useGetAllUser } from '@/hooks/user/useGetAllUser';
import { prettyNumber, roundNumber } from '@/lib/common';
import { cn } from '@/lib/utils';
import { type NextPageWithLayout } from '@/types';

import { useGetDailyReport } from '../MonthlyReportPage/hooks/useGetDailyReport';
import { useGetMonthlyReport } from '../MonthlyReportPage/hooks/useGetMonthlyReport';
import DashboardBox from './components/DashboardBox';
import RevenueChart from './components/RevenueChart';
import UserChart from './components/UserChart';

const DashboardPage: NextPageWithLayout = () => {
  const { meta: metaBook } = useGetAllBook();
  const { meta: metaUser } = useGetAllUser();
  const { meta: metaAdmin } = useGetAllAdmin();
  const { meta: metaOrder } = useGetAllOrder();
  const { meta: metaPost } = useGetAllPost();
  const { meta: metaCategory } = useGetAllCategory();
  const { meta: metaPublisher } = useGetAllPublisher();
  const { meta: metaAuthor } = useGetAllAuthor();
  const { totalRevenue, revenueChangePercentage } = useGetMonthlyReport();
  const { chartData, dailyRevenueChangePercentage } = useGetDailyReport();

  return (
    <VStack>
      <span className="text-2xl font-semibold"> Overview</span>
      <div className="grid grid-cols-4 gap-3">
        <DashboardBox
          title="Total Books"
          value={`${metaBook?.totalItems} books`}
          className="col-span-1 bg-gradient-to-br from-[#a8c0ff] to-[#3f2b96]"
        />

        <DashboardBox
          title="Total Author"
          value={`${metaAuthor?.totalItems} authors`}
          className="col-span-1 bg-gradient-to-br from-[#a8c0ff] to-[#3f2b96]"
        />

        <DashboardBox
          title="Total Publisher"
          value={`${metaPublisher?.totalItems} publishers`}
          className="col-span-1 bg-gradient-to-br from-[#a8c0ff] to-[#3f2b96]"
        />

        <DashboardBox
          title="Total Category"
          value={`${metaCategory?.totalItems} categories`}
          className="col-span-1 bg-gradient-to-br from-[#a8c0ff] to-[#3f2b96]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-[33.75rem]">
        <ShadowContainer className="space-y-10 col-span-1">
          <span className="text-2xl font-semibold">Revenue Management</span>

          <RevenueChart data={chartData} />
        </ShadowContainer>

        <div className="grid grid-cols-2 gap-3 col-span-1">
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

          <DashboardBox
            title="Monthly Revenue Percent"
            value={
              revenueChangePercentage >= 0
                ? `+${prettyNumber(roundNumber(String(revenueChangePercentage || 0)))} %`
                : `-${prettyNumber(roundNumber(String(revenueChangePercentage || 0)))} %`
            }
            className="col-span-1 bg-gradient-to-br from-[#000000] to-[#999999]"
            valueClasName={cn({
              'text-green-400': revenueChangePercentage > 0,
              'text-red-500': revenueChangePercentage < 0,
            })}
          />

          <DashboardBox
            title="Daily Revenue Percent"
            value={
              dailyRevenueChangePercentage >= 0
                ? `+${prettyNumber(roundNumber(String(dailyRevenueChangePercentage || 0)))} %`
                : `-${prettyNumber(roundNumber(String(dailyRevenueChangePercentage || 0)))} %`
            }
            className="col-span-1 bg-gradient-to-br from-[#6938ef] to-[#db7bc6]"
            valueClasName={cn({
              'text-green-400': dailyRevenueChangePercentage > 0,
              'text-red-500': dailyRevenueChangePercentage < 0,
            })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-[33.75rem]">
        <div className="grid grid-cols-2 gap-3 col-span-1">
          <DashboardBox
            title="Total Users"
            value={`${metaUser?.totalItems} users`}
            className="col-span-1 bg-gradient-to-br from-[#DA4453] to-[#89216B]"
          />

          <DashboardBox
            title="Total Admin"
            value={`${metaAdmin?.totalItems} admins`}
            className="col-span-1 bg-gradient-to-br from-[#ffa048] to-[#e4c980]"
          />

          <DashboardBox
            title="Total Blog"
            value={`${metaPost?.totalItems} blogs`}
            className="col-span-2 bg-gradient-to-br from-[#48ffc2] to-[#e4c980]"
          />
        </div>

        <ShadowContainer className="space-y-10 col-span-1">
          <span className="text-2xl font-semibold">User Management</span>

          <UserChart />
        </ShadowContainer>
      </div>
    </VStack>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
