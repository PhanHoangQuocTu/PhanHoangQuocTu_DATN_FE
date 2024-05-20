import MyOrderPage from '@/modules/MyOrderPage';

export default MyOrderPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
