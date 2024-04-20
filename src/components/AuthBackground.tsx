import Image from 'next/image';
import React from 'react';

const AuthBackground = () => {
  return (
    <div className="relative col-span-1 min-h-screen hidden lg:block">
      <Image src="/images/auth/auth-bg.webp" fill alt="auth background" priority unoptimized />
    </div>
  );
};

export default AuthBackground;
