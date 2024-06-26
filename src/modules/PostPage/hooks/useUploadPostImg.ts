import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { uploadFile } from '@/api/file';
import { usePostStore } from '@/stores/PostStore';

export const useUploadPostImg = () => {
  const postImg = usePostStore.use.postImg();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const uploadPostImg = async () => {
      if (postImg && typeof postImg !== 'string') {
        try {
          setIsLoading(true);
          const data = await uploadFile(postImg);
          setUrl(data.url);
        } catch (error) {
          toast.error(`Failed to upload file: ${error}`);
          setUrl('');
        } finally {
          setIsLoading(false);
        }
      }
    };

    uploadPostImg();
  }, [postImg]);

  return {
    url,
    isLoading,
  };
};
