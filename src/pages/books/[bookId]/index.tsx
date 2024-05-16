import BookDetailPage from '@/modules/BookDetailPage';

export default BookDetailPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      bookId: params.bookId,
    },
  };
}
