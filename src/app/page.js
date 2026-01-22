'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/products');
  }, [router]);

  return null;
};

export default HomePage;