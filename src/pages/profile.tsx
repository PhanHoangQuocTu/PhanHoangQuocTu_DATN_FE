import ProfilePage from '@/modules/ProfilePage';

export default ProfilePage;

export async function getServerSideProps({ params }: any) {
  return {
    props: params,
  };
}
