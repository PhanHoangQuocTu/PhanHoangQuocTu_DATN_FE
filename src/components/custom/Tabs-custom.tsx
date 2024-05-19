import { motion } from 'framer-motion';
import type { FC } from 'react';

import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface Props {
  data: Option[];
  onChange: (value: string) => void;
  value: string;
  layoutId: string;
  className?: string;
}

const TabsCustom: FC<Props> = ({ data, onChange, value, layoutId, className }) => {
  return (
    <div className={cn('border-b', className)}>
      <ul className="flex flex-wrap gap-6 ">
        {data.map((tab) => (
          <li
            onClick={() => onChange(tab.value)}
            className={cn(
              value === tab.value
                ? 'active relative inline-block pb-2 text-primary'
                : 'text-dark-gray relative inline-block border-transparent pb-2 hover:opacity-70',
              'cursor-pointer text-center text-sm font-medium'
            )}
            key={tab.value}
          >
            {tab.label}
            {value === tab.value ? (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-0 z-10 h-[.125rem] w-full bg-primary"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsCustom;
