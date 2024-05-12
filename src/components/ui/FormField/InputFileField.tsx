import React from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { InputFile, type InputFileProps } from '../inputFile';
import { Show } from '../Utilities';

interface Props<T extends FieldValues = FieldValues> extends InputFileProps {
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: FieldPathValue<T, FieldPath<T>>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  onChange: (file: File | null, blob?: string) => void;
}

const InputFileField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  defaultValue,
  label,
  required,
  onChange,
  ...props
}: Props<T>) => {
  return (
    <FormField
      defaultValue={defaultValue}
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl className="w-full">
            <div>
              <Show when={!!label}>
                <FormLabel className={labelClassName}>
                  {label} {required && <span className="text-error-light">*</span>}
                </FormLabel>
              </Show>
              <InputFile className={className} {...props} {...field} onChange={onChange} />
              <FormMessage className="mt-1 text-xs" />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export { InputFileField };
