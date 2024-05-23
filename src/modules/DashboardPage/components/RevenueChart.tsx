import React from 'react';

import AreaChartComp, { type IChartData } from './AreaChartComp';

interface Props {
  data: IChartData[];
}

const RevenueChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <AreaChartComp data={data} title="Revenue" roundNumberTooltip={0} tooltipSuffix={'đ'} isShowDateTooltip={false} />
    </div>
  );
};

export default RevenueChart;
