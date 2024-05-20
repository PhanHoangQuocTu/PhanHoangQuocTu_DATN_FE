import { BookManagementLayout } from '@/components/layouts/BookManagementLayout';
import BookManagementPage from '@/modules/BookManagementPage';

export default BookManagementPage;

BookManagementPage.getLayout = (page) => {
  return <BookManagementLayout>{page}</BookManagementLayout>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
