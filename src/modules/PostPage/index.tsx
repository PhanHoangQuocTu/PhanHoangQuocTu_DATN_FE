import React from 'react';

import PostList from './components/PostList';
import PostSidebar from './components/PostSidebar';

const PostPage = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-3 gap-5 min-h-screen">
        <PostList />

        <PostSidebar />
      </div>
    </div>
  );
};

export default PostPage;
