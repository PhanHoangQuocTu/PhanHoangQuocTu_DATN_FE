import DashboardPage from '@/modules/DashboardPage';

export default DashboardPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
