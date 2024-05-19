import React from 'react';

import { TitlePage } from '@/components/TitlePage';
import { type FCC } from '@/types';

import { AdminLayout } from '../AdminLayout';

const MonthlyReportLayout: FCC = ({ children }) => {
  return (
    <AdminLayout>
      <TitlePage title="Monthly Report" />

      <div className="space-y-4">
        <section>{children}</section>
      </div>
    </AdminLayout>
  );
};

export { MonthlyReportLayout };
