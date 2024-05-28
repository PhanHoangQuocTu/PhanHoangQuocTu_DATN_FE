import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';
import { HStack, VStack } from '@/components/ui/Utilities';
import { useGetAllPost } from '@/hooks/post/useGetAllPost';
import { cn } from '@/lib/utils';
import { ROUTE } from '@/types';

const BlogSection = () => {
  const { postList } = useGetAllPost(3, 'true');

  return (
    <VStack align={'center'} className="container py-16">
      <span className="text-4xl font-semibold">Lastest News</span>
      <span className="text-sm font-medium text-gray-500 text-center">Our latest news and articles</span>

      <HStack className="grid grid-cols-3 gap-5">
        {postList?.map((post) => (
          <PostItem key={post.id} content={post?.description} title={post?.title} images={post?.images} />
        ))}
      </HStack>
    </VStack>
  );
};

export default BlogSection;

interface IPostProps {
  title: string;
  content: string;
  images: string[];
  className?: string;
}

const PostItem: React.FC<IPostProps> = ({ title, content, images, className }) => {
  const imagePost = React.useMemo(() => {
    if (!images?.length) return '';

    return images[0];
  }, [images]);

  const renderImage = React.useMemo(() => {
    if (!imagePost)
      return (
        <HStack noWrap className="h-full w-full border border-border" pos={'center'} align={'center'}>
          <Icons.file size={40} />
        </HStack>
      );

    return (
      <div className="w-full relative h-96">
        <Image src={imagePost} alt="image-post" fill priority unoptimized className="shrink-0" />
      </div>
    );
  }, [imagePost]);
  return (
    <VStack className={cn('w-full h-full border border-border rounded-md', className)}>
      <VStack className="py-3 px-4" spacing={4}>
        <span className="text-xl font-semibold line-clamp-1">{title}</span>
        <span className="text-sm font-medium line-clamp-1"> {content}</span>
        <Link href={ROUTE.POST} className="text-primary hover:opacity-70 mt-3">
          Read more
        </Link>
      </VStack>

      {renderImage}
    </VStack>
  );
};
