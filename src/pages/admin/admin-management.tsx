import { AdminManagementLayout } from '@/components/layouts/AdminManagementLayout';
import AdminManagementPage from '@/modules/AdminManagementPage';

export default AdminManagementPage;

AdminManagementPage.getLayout = (page) => {
  return <AdminManagementLayout>{page}</AdminManagementLayout>;
};
