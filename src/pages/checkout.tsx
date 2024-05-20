import CheckoutPage from '@/modules/CheckoutPage';

export default CheckoutPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
