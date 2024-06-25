import type { VariantProps } from 'class-variance-authority';
import type { FC, ReactNode } from 'react';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  type selectTriggerVariants,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface IData {
  label: string;
  value: string;
  image?: string;
  group?: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof selectTriggerVariants> {
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  labelClassName?: string;
  data: IData[];
  onChangeValue?: (value: string) => void;
  value?: string;
  title?: string;
}

const SelectComp: FC<Props> = ({
  data,
  variant,
  inputSize,
  fullWidth,
  className,
  placeholder = 'Please select',
  value,
  title,
  onChangeValue,
  ...props
}) => {
  return (
    <div className={cn('relative', fullWidth ? 'w-full' : '')}>
      {title && <span className="absolute top-[-8px] text-[11px] left-2 px-1 bg-white text-slate-600">{title}</span>}
      <Select onValueChange={onChangeValue} value={value} disabled={props.disabled}>
        <div>
          <SelectTrigger variant={variant} inputSize={inputSize} className={cn(className, { 'w-full': fullWidth })}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </div>
        <SelectContent>
          {data.map((x) => (
            <SelectItem key={x.value} value={x.value} className="hover:bg-primary-800 hover:text-white">
              {x.image ? (
                <div className="flex items-center space-x-2 hover:bg-primary-800">
                  {x.image && <img src={x.image!} alt="" className="h-6 w-6" />}
                  <p>{x.label}</p>
                </div>
              ) : (
                x.label
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { SelectComp };
