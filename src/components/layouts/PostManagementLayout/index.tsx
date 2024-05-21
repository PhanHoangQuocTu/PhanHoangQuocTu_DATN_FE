import React from 'react';

import { TitlePage } from '@/components/TitlePage';
import { type FCC } from '@/types';

import { AdminLayout } from '../AdminLayout';

const PostManagementLayout: FCC = ({ children }) => {
  return (
    <AdminLayout>
      <TitlePage title="Post Management" />

      <div className="space-y-4">
        <section>{children}</section>
      </div>
    </AdminLayout>
  );
};

export { PostManagementLayout };
