import { AuthorManagementLayout } from '@/components/layouts/AuthorManagementLayout';
import AuthorManagementPage from '@/modules/AuthorManagementPage';

export default AuthorManagementPage;

AuthorManagementPage.getLayout = (page) => {
  return <AuthorManagementLayout>{page}</AuthorManagementLayout>;
};
