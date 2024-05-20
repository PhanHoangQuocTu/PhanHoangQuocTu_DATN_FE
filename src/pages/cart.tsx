import CartPage from '@/modules/CartPage';

export default CartPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
