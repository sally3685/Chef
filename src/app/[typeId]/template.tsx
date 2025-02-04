'use client';
import { useAnimation } from '@/helpers/useAnimation';
import { animateAuthEnter } from '@/app/animation';
export default function Template({ children }: { children: React.ReactNode }) {
  useAnimation(() => {
    animateAuthEnter();
  }, []);
  return <>{children}</>;
}
