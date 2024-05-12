import axios from 'axios';

import { CLOUDINARY_API, env } from '@/lib/const';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('upload_preset', env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME);
  formData.append('file', file);
  formData.append('folder', 'DATN');

  const { data } = await axios.post(CLOUDINARY_API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
