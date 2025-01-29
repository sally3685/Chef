'use client';
import { useEffect, useLayoutEffect } from 'react';
import { animateAuthEnter } from '@/app/animation';
export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    animateAuthEnter();
  }, []);
  return <>{children}</>;
}
