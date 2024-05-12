import * as NextImage from 'next/image';
import type { ChangeEvent, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/assets/icons';
import { validateFileFormat, validateFileSize } from '@/lib/common';
import { FILE_FORMAT } from '@/lib/const';
import { REGEX_NO_SPECIAL_CHARACTERS, REGEX_NO_WHITESPACES } from '@/lib/regex';
import { cn } from '@/lib/utils';
import type { FCC } from '@/types';

import { Button } from './button';
import { HStack, VStack } from './Utilities';

interface IValidate {
  size?: number;
  format?: string[];
  sizeMessage?: string;
  formatMessage?: string;
}

interface ISizeValidate {
  width: number;
  height: number;
  message: string;
}

export interface InputFileProps {
  onChange: (file: File | null, blob?: string) => void;
  className?: string;
  containerClassName?: string;
  preview?: File | string | null;
  withBorder?: boolean;
  disabled?: boolean;
  validate?: IValidate;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  description?: ReactNode;
  sizeValidate?: ISizeValidate;
}

const InputFile: FCC<InputFileProps> = ({
  onChange,
  preview,
  rounded = 'xl',
  withBorder = true,
  disabled = false,
  containerClassName,
  className,
  description = 'Click to select files',
  validate = {
    size: 100,
    format: FILE_FORMAT,
    sizeMessage: 'File too large. File is larger than 100MB',
    formatMessage: 'The file is not in the required format',
  },
  sizeValidate = {
    width: 300,
    height: 300,
    message: 'Please use PNG or JPG files larger than 300 x 300 px',
  },
}) => {
  const [blob, setBlob] = useState('');
  const targetRef = useRef<HTMLInputElement>(null);

  const checkFileName = (fileName: string) => {
    const hasSpecialChars = REGEX_NO_SPECIAL_CHARACTERS.test(fileName);
    const hasWhiteSpace = REGEX_NO_WHITESPACES.test(fileName);

    return !(hasSpecialChars || hasWhiteSpace);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target?.files![0];

    if (selectedFile) {
      if (!checkFileName(selectedFile.name)) {
        if (targetRef.current) {
          targetRef.current.value = '';
        }
        return toast.error('File name cannot have special characters and whitespaces');
      }
      const image = new Image();

      image.onload = () => {
        if (image.width >= sizeValidate.width && image.height >= sizeValidate.height) {
          const fileBlob = URL.createObjectURL(selectedFile);
          onChange(selectedFile, fileBlob);
          setBlob(fileBlob);
        } else {
          toast.error(sizeValidate.message);
          if (targetRef.current) {
            targetRef.current.value = '';
          }
          setBlob('');
          onChange(null, '');
        }
      };

      if (!validateFileSize(selectedFile, validate.size)) {
        toast.error(validate?.sizeMessage);
        if (targetRef.current) {
          targetRef.current.value = '';
        }
        return 0;
      }

      if (!validateFileFormat(selectedFile, validate.format)) {
        toast.error(validate?.formatMessage);
        if (targetRef.current) {
          targetRef.current.value = '';
        }
        return 0;
      }

      image.src = URL.createObjectURL(selectedFile);

      if (blob) {
        URL.revokeObjectURL(blob);
      }

      const fileBlob = URL?.createObjectURL(selectedFile);
      onChange(selectedFile, fileBlob);
      setBlob(fileBlob);
    }

    return 0;
  };

  const handleClear = () => {
    setBlob('');
    onChange(null, '');
    URL.revokeObjectURL(blob);
    if (targetRef.current) {
      targetRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!!preview && typeof preview === 'string') {
      setBlob(preview);
      return;
    }

    if (!!preview && typeof preview === 'object' && preview?.type) {
      setBlob(URL.createObjectURL(preview));
      onChange(preview);
      return;
    }

    if (!preview) {
      setBlob('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  return (
    <div className={cn('mb-2', containerClassName)}>
      <div
        className={cn(
          {
            'border-2 border-dashed border-black': withBorder,
          },
          `rounded-${rounded} relative flex h-full w-full mb-2 items-center justify-center overflow-hidden font-medium hover:cursor-pointer`,
          className
        )}
        onClick={(e) => {
          if (blob || disabled) {
            e.preventDefault();
          } else {
            targetRef.current?.click();
          }
        }}
      >
        {blob && (
          <NextImage.default
            fill
            className="z-1 absolute left-0 right-0 top-0 h-full w-full rounded-xl object-cover"
            src={blob}
            alt=""
          />
        )}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-full">
          {blob ? (
            <HStack pos={'center'}>
              <Button disabled={disabled} variant="outline" onClick={handleClear} size={'sm'}>
                <Icons.trash size={32} />
              </Button>
            </HStack>
          ) : (
            <VStack justify={'center'} align={'center'} spacing={8}>
              <Icons.imagePlus size={40} />
              <div className="text-gray-500 text-center text-xs">{description}</div>
            </VStack>
          )}
        </div>

        <input
          ref={targetRef}
          type="file"
          hidden
          onChange={handleFileChange}
          className="w-full rounded border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
      </div>
    </div>
  );
};

export { InputFile };
