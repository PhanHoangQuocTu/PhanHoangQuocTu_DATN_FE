import LoginPage from '@/modules/LoginPage';

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
