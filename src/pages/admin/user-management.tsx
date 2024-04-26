import { UserManagementLayout } from '@/components/layouts/UserManagementLayout';
import UserManagementPage from '@/modules/UserManagementPage';

export default UserManagementPage;

UserManagementPage.getLayout = (page) => {
  return <UserManagementLayout>{page}</UserManagementLayout>;
};
