import { CategoryManagementLayout } from '@/components/layouts/CategoryManagementLayout';
import CategoryManagementPage from '@/modules/CategoryManagementPage';

export default CategoryManagementPage;

CategoryManagementPage.getLayout = (page) => {
  return <CategoryManagementLayout>{page}</CategoryManagementLayout>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
