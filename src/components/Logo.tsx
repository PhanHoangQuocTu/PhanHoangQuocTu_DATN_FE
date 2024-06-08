import React from 'react';

import { cn } from '@/lib/utils';

const Logo = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'text-2xl font-semibold bg-gradient-to-r from-primary to-indigo-400 text-transparent bg-clip-text',
          className
        )}
        {...props}
      >
        QT Book Store
      </span>
    );
  }
);

export default Logo;
