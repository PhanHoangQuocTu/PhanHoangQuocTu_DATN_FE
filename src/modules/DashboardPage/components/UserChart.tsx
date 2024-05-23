import React from 'react';

import { useGetUserPerDayQuery } from '@/api/user/queries';

import AreaChartComp from './AreaChartComp';

const UserChart = () => {
  const { data } = useGetUserPerDayQuery({
    variables: {
      days: 14,
    },
  });

  const chartData = React.useMemo(() => {
    if (!data) return [];

    return data?.map((item) => {
      return {
        date: item.date,
        value: item.count,
      };
    });
  }, [data]);

  return (
    <div className="w-full h-full">
      <AreaChartComp data={chartData} title="Total Users" roundNumberTooltip={0} tooltipSuffix="users" />
    </div>
  );
};

export default UserChart;
