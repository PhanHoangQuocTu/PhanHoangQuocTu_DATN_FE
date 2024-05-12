import { useEffect, useState } from 'react';

import { uploadFile } from '@/api/file';
import { useBookManagementStore } from '@/stores/BookManagementStore';

export const useUploadBookImg = () => {
  const productImg = useBookManagementStore.use.productImg();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const uploadProduct = async () => {
      if (productImg && typeof productImg !== 'string') {
        try {
          const data = await uploadFile(productImg);
          setUrl(data.url);
        } catch (error) {
          console.error('Failed to upload file:', error);
          setUrl('');
        }
      }
    };

    uploadProduct();
  }, [productImg]);

  return {
    url,
  };
};
