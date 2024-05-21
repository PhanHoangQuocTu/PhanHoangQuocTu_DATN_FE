import { HStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';

export const OrderInfo = ({
  title,
  data,
  className = '',
  dataClassName = '',
}: {
  title: string;
  data: string | React.ReactNode;
  className?: string;
  dataClassName?: string;
}) => {
  return (
    <HStack noWrap align={'start'} className={className}>
      <span className="font-semibold text-base min-w-36">{title} </span>
      <span className={cn('font-medium text-sm', dataClassName)}>{data}</span>
    </HStack>
  );
};
