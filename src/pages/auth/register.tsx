import RegisterPage from '@/modules/RegisterPage';

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
