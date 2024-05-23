import { format } from 'date-fns';
import React from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { type TooltipProps } from 'recharts/types/component/Tooltip';

import { ShadowContainer } from '@/components/ShadowContainer';
import { prettyNumber, roundNumber } from '@/lib/common';
import { type FCC } from '@/types';

export interface IChartData {
  date: string;
  value: number;
}

interface Props {
  data: IChartData[];
  roundNumberTooltip?: number;
  title: string;
  tooltipSuffix?: string;
  isShowDateTooltip?: boolean;
}

const AreaChartComp: FCC<Props> = ({
  data: chartData,
  roundNumberTooltip = 2,
  title,
  tooltipSuffix,
  isShowDateTooltip = true,
}) => {
  return (
    <div className="min-h-[20rem] h-96 flex-1 w-full">
      <ResponsiveContainer width={'99%'} height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#1F639C" stopOpacity="0.5" />
              <stop offset="0.0001" stopColor="#1F639C" stopOpacity="0.2" />
              <stop offset="1" stopColor="#26C2C8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            dy={12}
            tick={{ fontSize: 11 }}
            // tickFormatter={(value: string) => xAxisTickFormatter(value, type)}
            axisLine={false}
          />

          <YAxis
            width={80}
            axisLine={false}
            dx={-8}
            tick={{ fontSize: 11 }}
            tickFormatter={(value: string) => yAxisTickformatter(value, roundNumberTooltip)}
            tickLine={false}
          />

          <ReferenceLine y={0} stroke="#000000" />

          <CartesianGrid horizontal vertical={false} />

          <Tooltip
            content={
              <CustomTooltip
                roundNumberTooltip={roundNumberTooltip}
                title={title}
                tooltipSuffix={tooltipSuffix}
                isShowDateTooltip={isShowDateTooltip}
              />
            }
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#1F639C"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPerformance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComp;

const yAxisTickformatter = (value: string, round = 2) => `${prettyNumber(roundNumber(value || '0', round))}`;

// const xAxisTickFormatter = (name: string, type: 'fullDay' | 'month') => {
//   const [_, month, day] = name.split('/');
//   return `${day}/${month}`;
// };

const CustomTooltip: React.FC<
  TooltipProps<any, any> & {
    roundNumberTooltip: number;
    title: string;
    tooltipSuffix?: string;
    isShowDateTooltip?: boolean;
  }
> = ({ label, active, payload, roundNumberTooltip, title, tooltipSuffix, isShowDateTooltip }) => {
  if (label && active && payload && payload.length) {
    return (
      <ShadowContainer className="space-y-2 bg-white p-2">
        <p className="font-semibold text-[#929292]">
          {format(new Date(label), isShowDateTooltip ? 'yyyy/MM/dd' : 'MM-yyyy')}
        </p>
        <div className="flex gap-2">
          <p className="font-semibold text-[#929292]">{title}</p>
          <p className="text-base font-bold">
            {prettyNumber(roundNumber(payload[0].value || '0', roundNumberTooltip))} {tooltipSuffix}
          </p>
        </div>
      </ShadowContainer>
    );
  }

  return null;
};
