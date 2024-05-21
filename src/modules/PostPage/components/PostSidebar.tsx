import Image from 'next/image';
import React from 'react';

const PostSidebar = () => {
  return (
    <div className="col-span-1 relative rounded-lg overflow-hidden">
      <Image src={'/images/post/banner-post.webp'} alt="banner-post" fill unoptimized priority />
    </div>
  );
};

export default PostSidebar;
