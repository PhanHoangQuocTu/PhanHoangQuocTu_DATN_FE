import React from 'react';

import { Icons } from '@/assets/icons';
import ChatComponent from '@/components/ChatComponent';
import NotLoginComponent from '@/components/ChatComponent/NotLoginComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import type { FCC } from '@/types';

import { Sidebar } from './Sidebar';

const AdminLayout: FCC = ({ children }) => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="flex">
      <Sidebar />

      <article className="container w-full overflow-clip">
        {/* <Header /> */}

        <main className="min-h-screen pb-4 relative">
          {children}
          <Popover>
            <PopoverTrigger asChild>
              <button className="fixed bottom-5 right-5 bg-primary h-20 w-20 rounded-full flex items-center justify-center">
                <Icons.messageCirle color="white" size={40} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {isLoggedIn && <ChatComponent userId={user?.id || 0} userName={'Admin'} />}

              {!isLoggedIn && <NotLoginComponent />}
            </PopoverContent>
          </Popover>
        </main>
      </article>
    </div>
  );
};

export default AdminLayout;
