export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dcllkkeyc',
  NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_NEXT_PUBLIC_CLOUDINARY_API_KEY ?? '755895951781579',
  NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: process.env.NEXT_PUBLIC_NEXT_PUBLIC_CLOUDINARY_PRESET_NAME ?? 'datn_preset',
  NEXT_PUBLIC_CLOUDINARY_API_SECRET:
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_CLOUDINARY_API_SECRET ?? 'sWhUC0sK9ES3ZpXMS_KvLPlLI',
};

export const isServer = typeof window === 'undefined';

export const limit_infinite = 9999999999999;

export const FILE_FORMAT = ['image/png', 'image/jpeg', 'image/jpg'];

export const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
