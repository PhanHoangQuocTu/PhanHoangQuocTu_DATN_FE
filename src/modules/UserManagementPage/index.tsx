import React from 'react';

import { type NextPageWithLayout } from '@/types';

import UserManagementTable from './components/UserManagementTable';

const UserManagementPage: NextPageWithLayout = () => {
  return (
    <div>
      <UserManagementTable />
    </div>
  );
};

export default UserManagementPage;
