import React from 'react';

import { TitlePage } from '@/components/TitlePage';
import { type FCC } from '@/types';

import { AdminLayout } from '../AdminLayout';

const PublisherManagementLayout: FCC = ({ children }) => {
  return (
    <AdminLayout>
      <TitlePage title="Publisher Management" />

      <div className="space-y-4">
        <section>{children}</section>
      </div>
    </AdminLayout>
  );
};

export { PublisherManagementLayout };
