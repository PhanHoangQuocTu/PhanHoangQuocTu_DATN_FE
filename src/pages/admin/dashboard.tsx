import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import DashboardPage from '@/modules/DashboardPage';

export default DashboardPage;

DashboardPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
