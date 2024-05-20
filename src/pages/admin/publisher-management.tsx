import { PublisherManagementLayout } from '@/components/layouts/PublisherManagementLayout';
import PublisherManagementPage from '@/modules/PublisherManagementPage';

export default PublisherManagementPage;

PublisherManagementPage.getLayout = (page) => {
  return <PublisherManagementLayout>{page}</PublisherManagementLayout>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
