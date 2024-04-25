import React from 'react';

import { TitlePage } from '@/components/TitlePage';
import { type FCC } from '@/types';

import { AuthLayout } from '../AuthLayout';

const DashboardLayout: FCC = ({ children }) => {
  return (
    <AuthLayout>
      <TitlePage title="Dashboard" />

      <div className="space-y-4">
        <section>{children}</section>
      </div>
    </AuthLayout>
  );
};

export { DashboardLayout };
