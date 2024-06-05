import React from 'react';

import ChatComponent from '@/components/ChatComponent';
import { useAuth } from '@/hooks/useAuth';
import type { FCC } from '@/types';

import { Sidebar } from './Sidebar';

const AdminLayout: FCC = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />

      <article className="container w-full overflow-clip">
        {/* <Header /> */}

        <main className="min-h-screen pb-4">
          {children}
          <ChatComponent userId={user?.id || 0} userName={'Admin'} />
        </main>
      </article>
    </div>
  );
};

export default AdminLayout;
