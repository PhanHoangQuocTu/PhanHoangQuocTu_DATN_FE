import type { ReactNode } from 'react';
import React from 'react';

import ChatComponent from '@/components/ChatComponent';
import { useAuth } from '@/hooks/useAuth';
import type { FCC } from '@/types';

import Footer from './Footer';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const MainLayout: FCC<Props> = ({ children }) => {
  const { user, fullName } = useAuth();
  return (
    <div className="overflow-clip">
      <Header />
      <main className="min-h-screen">{children}</main>
      <ChatComponent userId={user?.id || 0} userName={fullName} />
      <Footer />
    </div>
  );
};

export default MainLayout;
