import dynamic from 'next/dynamic';
import React from 'react';

import AuthBackground from '@/components/AuthBackground';
import { VStack } from '@/components/ui/Utilities';
import { type NextPageWithLayout } from '@/types';

const AdminLoginForm = dynamic(() => import('./components/AdminLoginForm'), { ssr: false });

const AdminLoginPage: NextPageWithLayout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <AuthBackground />

      <VStack className="col-span-1">
        <AdminLoginForm />
      </VStack>
    </div>
  );
};

export default AdminLoginPage;
