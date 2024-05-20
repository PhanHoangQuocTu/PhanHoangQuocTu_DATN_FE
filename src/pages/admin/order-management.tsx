import { OrderManagementLayout } from '@/components/layouts/OrderManagementLayout';
import OrderManagementPage from '@/modules/OrderManagementPage';

export default OrderManagementPage;

OrderManagementPage.getLayout = (page) => {
  return <OrderManagementLayout>{page}</OrderManagementLayout>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
