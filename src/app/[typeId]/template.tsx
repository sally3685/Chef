'use client';
import { useAnimation } from '@/helpers/useAnimation';
import { animateAuthEnter } from '@/app/animation';
export default function Template({ children }: { children: React.ReactNode }) {
  useAnimation(() => {
    if (typeof window !== 'undefined') {
      animateAuthEnter();
    }
  }, []);
  return <>{children}</>;
}
