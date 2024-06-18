import { AdminLayout } from '@/components/layouts/AdminLayout';
import DashboardPage from '@/modules/DashboardPage';

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
