import AdminLoginPage from '@/modules/AdminLoginPage';

export default AdminLoginPage;

AdminLoginPage.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
