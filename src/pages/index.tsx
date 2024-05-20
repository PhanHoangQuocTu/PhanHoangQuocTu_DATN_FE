import LandingPage from '@/modules/LandingPage';

export default LandingPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
