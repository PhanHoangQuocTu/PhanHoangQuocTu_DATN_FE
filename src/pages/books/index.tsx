import BooksPage from '@/modules/BooksPage';

export default BooksPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
