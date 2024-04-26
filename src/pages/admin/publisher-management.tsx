import { PublisherManagementLayout } from '@/components/layouts/PublisherManagementLayout';
import PublisherManagementPage from '@/modules/PublisherManagementPage';

export default PublisherManagementPage;

PublisherManagementPage.getLayout = (page) => {
  return <PublisherManagementLayout>{page}</PublisherManagementLayout>;
};
