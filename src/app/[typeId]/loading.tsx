'use client';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
export default function Loading() {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/loader.json',
      });
    }
  }, []);

  return (
    <>
      <div>
        <h1>الرجاء الانتظار ...</h1>
        <div ref={animationContainer}></div>
      </div>
    </>
  );
}
