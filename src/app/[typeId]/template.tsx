'use client';
import { useEffect } from 'react';
import { animate } from '@/app/animation';
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animate();
  }, []);
  return <>{children}</>;
}
