import { HStack } from '@/components/ui/Utilities';

export const OrderInfo = ({ title, data }: { title: string; data: string | React.ReactNode }) => {
  return (
    <HStack noWrap align={'start'}>
      <span className="font-semibold text-base min-w-36">{title} </span>
      <span className="font-medium text-sm">{data}</span>
    </HStack>
  );
};
