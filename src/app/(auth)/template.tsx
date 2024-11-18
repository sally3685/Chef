'use client';

import { useEffect } from 'react';
import { animate } from '../animation';
import { usePathname } from 'next/navigation';
export default function Template({ children }: { children: React.ReactNode }) {
  const pageType = usePathname();
  useEffect(() => {
    animate();
  }, []);
  return (
    <>
      <div
        id="containerofcube"
        className="w-[500px] h-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: '1000px' }}
      >
        {' '}
        <div
          id="cube"
          className="w-[500px] h-[500px] absolute "
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(250px) rotateX(0deg) rotateY(0deg)',
              transformOrigin: '50% 50% -250px',
            }}
            className=" face !bg-cover !bg-center  dark:bg-[#eea1437d] bg-[#c7e198]  dark:border dark:border-[#f3e37c] dark:border-y-2 dark:border-x-2  w-[500px] h-[500px] absolute "
          ></div>
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(250px) rotateX(0deg) rotateY(90deg)',
              transformOrigin: '50% 50% -250px',
            }}
            className=" face !bg-cover !bg-center  dark:bg-[#eee5437b] bg-[#c7e198] dark:border dark:border-[#f3e37c] dark:border-y-2 dark:border-x-2  w-[500px] h-[500px] absolute"
          >
            {pageType === '/sign-up' ? children : ''}
          </div>
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(250px) rotateX(0deg) rotateY(180deg)',
              transformOrigin: '50% 50% -250px',
            }}
            className=" face !bg-cover !bg-center  dark:bg-[#eea1437d] bg-[#c7e198]  dark:border dark:border-[#f3e37c] dark:border-y-2 dark:border-x-2  w-[500px] h-[500px] absolute"
          >
            {pageType === '/forgot-password' ? children : ''}
          </div>
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(250px) rotateX(0deg) rotateY(270deg)',
              transformOrigin: '50% 50% -250px',
            }}
            className=" face !bg-cover !bg-center  dark:bg-[#eee5437b] bg-[#c7e198]  dark:border dark:border-[#f3e37c] dark:border-y-2 dark:border-x-2  w-[500px] h-[500px] absolute"
          >
            {' '}
          </div>
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(250px) rotateX(90deg) rotateY(0deg)',
              transformOrigin: '50% 50% -250px',
            }}
            className=" face !bg-cover !bg-center  dark:bg-[#eea1437d] bg-[#c7e198]  dark:border dark:border-[#f3e37c] dark:border-y-2 dark:border-x-2  w-[500px] h-[500px] absolute"
          >
            {pageType === '/sign-in' ? children : ''}
          </div>
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(250px) rotateX(-90deg) rotateY(0deg)',
              transformOrigin: '50% 50% -250px',
            }}
            className=" face !bg-cover !bg-center  dark:bg-[#eee5437b] bg-[#c7e198]  dark:border dark:border-[#f3e37c] dark:border-y-2 dark:border-x-2  w-[500px] h-[500px] absolute"
          >
            {pageType === '/verify-email' ? children : ''}
          </div>
        </div>
      </div>

      {/* {children} */}
    </>
  );
}
