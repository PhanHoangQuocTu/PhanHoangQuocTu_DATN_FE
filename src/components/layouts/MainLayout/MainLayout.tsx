import type { ReactNode } from 'react';
import React from 'react';

import { Icons } from '@/assets/icons';
import ChatComponent from '@/components/ChatComponent';
import NotLoginComponent from '@/components/ChatComponent/NotLoginComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import type { FCC } from '@/types';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const MainLayout: FCC<Props> = ({ children }) => {
  const { user, fullName, isLoggedIn } = useAuth();
  return (
    <div className="overflow-clip relative">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Popover>
        <PopoverTrigger asChild>
          <button className="fixed bottom-5 right-5 bg-primary h-20 w-20 rounded-full flex items-center justify-center">
            <Icons.messageCirle color="white" size={40} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          {isLoggedIn && <ChatComponent userId={user?.id || 0} userName={fullName} />}

          {!isLoggedIn && <NotLoginComponent />}
        </PopoverContent>
      </Popover>
      <Footer />
    </div>
  );
};

export default MainLayout;
