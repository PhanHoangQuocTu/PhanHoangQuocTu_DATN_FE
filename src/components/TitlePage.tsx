import React from 'react';

import { Separator } from './ui/separator';

type Props = {
  title: string;
};

const TitlePage = ({ title }: Props) => {
  return (
    <div className="sticky top-0 z-50 space-y-4 overflow-x-hidden bg-white py-4">
      <h1 className="text-2xl leading-normal">{title}</h1>

      <Separator />
    </div>
  );
};

export { TitlePage };
