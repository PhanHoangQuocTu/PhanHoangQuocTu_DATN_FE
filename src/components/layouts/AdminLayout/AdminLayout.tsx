import React from 'react';

import type { FCC } from '@/types';

import { Sidebar } from './Sidebar';

const AdminLayout: FCC = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <article className="container w-full overflow-clip">
        {/* <Header /> */}

        <main className="min-h-screen pb-4">{children}</main>
      </article>
    </div>
  );
};

export default AdminLayout;
