'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import itemsArray from '../detailes/[recipyId]/items';
import { useGSAP } from '@gsap/react';

import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/all';
import { useEffect, useRef } from 'react';
const classes = [
  ['!row-start-1', '!col-start-1'],
  ['!row-start-2', '!col-start-4'],
  ['!row-start-1', '!col-start-7'],
  ['!row-start-4', '!col-start-9'],
  ['!row-start-6', '!col-start-7'],
  ['!row-start-7', '!col-start-8'],
  ['!row-start-9', '!col-start-7'],
  ['!row-start-10', '!col-start-9'],
  ['!row-start-1', '!col-start-9'],
  ['!row-start-1', '!col-start-5'],
  ['!row-start-4', '!col-start-7'],
];
export default function Menu() {
  let pathname = usePathname();
  if (!pathname) pathname = '1';

  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const states = document.querySelectorAll('.tomato');
    const items = document.querySelectorAll('.wood');
    const section = document.querySelector('.section');
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip);

    ScrollTrigger.refresh();

    states.forEach((tomatoElement, index) => {
      tomatoElement?.classList.remove(...classes[index]);
    });
    // flipCtx = gsap.context(() => {
    const allStates = gsap.utils.toArray('.tomato') as HTMLElement[];

    const state = Flip.getState(allStates);
    states.forEach((tomatoElement, index) => {
      tomatoElement?.classList.add(...classes[index]);
    });
    const flip = Flip.from(state, {
      duration: 2,
      ease: 'power1.inOut',
      // stagger: 0.1,
      rotate: 400,
      onComplete: () => console.log('done'),
    });
    ScrollTrigger.create({
      trigger: containerRef?.current,
      start: 'top center',
      end: '+=20%',
      animation: flip,
      // pin: true,
      scrub: true,
      markers: true,
    });
    items.forEach((item) => {
      gsap.to(item, {
        rotate: 360,
        scrollTrigger: {
          scroller: section,
          trigger: item,
          start: 'top bottom',
          scrub: true,
        },
      });
    });
  });

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="grid grid-cols-10 grid-rows-10 w-[90%] sm:w-[30%]  h-[50%] left-0 top-0 absolute ggg"
        >
          <div className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato2.png)] bg-contain bg-no-repeat bg-center  scale-50"></div>
          <div className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato2.png)] bg-contain bg-no-repeat bg-center  scale-75"></div>
          <div className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato2.png)] bg-contain bg-no-repeat bg-center  scale-75"></div>
        </div>
        <section className=" relative  max-w-6xl sm:mx-auto mx-8 z-[3]">
          <h2 className="my-12 text-3xl">وصفات متنوعة</h2>
          <div
            className="max-w-6xl mx-auto p-6 relative section
        mt-12 flex flex-wrap gap-10 justify-center items-center max-h-[80vh] overflow-y-scroll shadow-[0_0_11px_4px_#00000070]"
          >
            {itemsArray.map((item, index1) => (
              <div
                key={index1}
                className="relative p-4 
           w-72 h-64  item"
              >
                <svg
                  className="absolute z-[-2] "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 316.25 316.25"
                >
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      x2="100%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#18181b" />
                      {/* {`${item.color}`} */}
                      <stop offset="100%" stopColor="#f99e1e7b" />
                    </linearGradient>
                  </defs>
                  <title>Asset 3</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        style={{ fill: `url(#grad1)` }}
                        d="M282.77,316.13H33.48A33.36,33.36,0,0,1,.13,282.77V33.48A33.35,33.35,0,0,1,33.48.13H282.77a33.36,33.36,0,0,1,33.36,33.35L296.08,135.81a128.54,128.54,0,0,0,.24,50.58l19.81,96.38A33.37,33.37,0,0,1,282.77,316.13Z"
                      />
                    </g>
                  </g>
                </svg>

                <div className="relative   flex justify-between flex-col h-full mt-4">
                  <Image
                    className={`
              w-56 h-52 absolute shadow-[0_0_20px_5px_black] rounded-[50%] -left-9 -top-6`}
                    src="/wooden.png"
                    alt="wooden"
                    width="251"
                    height="543"
                  ></Image>
                  <Image
                    className={`
              w-11 h-11  absolute  right-8 top-[10%] z-[-1] transform -rotate-45`}
                    src={item ? item.down : ''}
                    alt={item ? item.title : ''}
                  ></Image>
                  <Image
                    className={`
              w-11 h-11  absolute  right-12 top-[60%] z-[-1] transform rotate-45`}
                    src={item ? item.down : ''}
                    alt={item ? item.title : ''}
                  ></Image>
                  <Image
                    className={`
              w-40 h-40 wood relative -left-[40%] -top-[50]`}
                    src={item ? item.src : ''}
                    alt={item ? item.title : ''}
                  ></Image>

                  <button>
                    <a href={`${pathname}/detailes/${item.id}`}>
                      <h2 className="text-xl pt-2 hover:opacity-40">
                        {item.title}
                      </h2>
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
