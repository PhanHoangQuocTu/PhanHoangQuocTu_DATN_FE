import { CategoryManagementLayout } from '@/components/layouts/CategoryManagementLayout';
import CategoryManagementPage from '@/modules/CategoryManagementPage';

export default CategoryManagementPage;

CategoryManagementPage.getLayout = (page) => {
  return <CategoryManagementLayout>{page}</CategoryManagementLayout>;
};
