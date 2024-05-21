import PostDetailPage from '@/modules/PostDetailPage';

export default PostDetailPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      postId: params.postId,
    },
  };
}
