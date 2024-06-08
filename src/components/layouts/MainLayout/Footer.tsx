import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';
import Logo from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import { VStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';
import { ROUTE } from '@/types';

const Footer = () => {
  return (
    <>
      <footer>
        <Separator />
        <div className="container grid grid-cols-5 py-16">
          <Logo className="col-span-1" />

          <VStack className="col-span-2">
            <span className="text-primary text-2xl font-semibold">PRODUCTS</span>
            <Link className="text-base font-medium hover:opacity-50 w-fit" href={ROUTE.BOOKS}>
              Books
            </Link>
            <Link className="text-base font-medium hover:opacity-50 w-fit" href={ROUTE.POST}>
              Community
            </Link>
          </VStack>

          <VStack className="col-span-2">
            <span className="text-primary text-2xl font-semibold">CONTACT</span>
            <ContactItem icon={<Icons.mail />} title="tuphan694@gmail.com" type="mail" />
            <ContactItem icon={<Icons.phone />} title="(+84) 905-332-165" />
            <ContactItem icon={<Icons.home />} title="Phan Hoàng Quốc Tú, Đà Nẵng, Việt Nam" />
          </VStack>
        </div>
        <Separator />
        <div className="container py-4">
          <p className="py-2 text-center font-medium text-base">Copyright © 2024: Phan Hoàng Quốc Tú</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
  type?: 'div' | 'mail';
}

const ContactItem = React.forwardRef<React.ElementRef<'div'>, ContactItemProps>(
  ({ className, icon, title, type = 'div', ...props }, ref) => {
    if (type === 'mail') {
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        {icon}
        <Link href={`mailto:${title}`} className="text-base font-medium">
          {title}
        </Link>
      </div>;
    }

    return (
      <div ref={ref} className={cn('flex items-center gap-4', className)} {...props}>
        {icon}
        <span className="text-base font-medium">{title}</span>
      </div>
    );
  }
);
