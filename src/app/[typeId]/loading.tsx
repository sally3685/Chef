'use client';
import lottie, { AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';

export default function Loading() {
  const animationContainer = useRef<HTMLDivElement>(null);
  let animationInstance: AnimationItem | null = null;

  useEffect(() => {
    if (animationContainer.current) {
      if (animationInstance) {
        animationInstance.destroy(); // Clear any existing animation
      }

      animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/loader.json',
      });
    }

    return () => {
      if (animationInstance) {
        animationInstance.destroy(); // Clean up animation on unmount
      }
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden flex justify-center flex-col items-center ">
        <h1>الرجاء الانتظار ...</h1>
        <div
          className="w-[100px] h-[100px] relative overflow-hidden"
          ref={animationContainer}
        ></div>
      </div>
    </>
  );
}
