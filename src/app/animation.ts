import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ScrollSmoother from 'gsap/all';
export const animate = () => {
  const highliter = document.querySelectorAll('.highliter');
  const herb1 = document.querySelectorAll('.herb1');
  const herb2 = document.querySelectorAll('.herb2');
  const items = document.querySelectorAll('.wood');
  const section = document.querySelector('.section');

  // const classes = [
  //   ['!row-start-1', '!col-start-1'],
  //   ['!row-start-2', '!col-start-4'],
  //   ['!row-start-1', '!col-start-7'],
  //   ['!row-start-4', '!col-start-9'],
  //   ['!row-start-6', '!col-start-7'],
  //   ['!row-start-7', '!col-start-8'],
  //   ['!row-start-9', '!col-start-7'],
  //   ['!row-start-10', '!col-start-9'],
  //   ['!row-start-1', '!col-start-9'],
  //   ['!row-start-1', '!col-start-5'],
  //   ['!row-start-4', '!col-start-7'],
  // ];

  // gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip);

  // let flipCtx: gsap.Context;
  // const states = document.querySelectorAll('.tomato');
  // const ggg = document.querySelector('.ggg');
  // function anim() {
  //   if (flipCtx) {
  //     flipCtx.revert();
  //   }

  //   ScrollTrigger.refresh();

  //   states.forEach((tomatoElement, index) => {
  //     tomatoElement?.classList.add(...classes[index]);
  //   });

  //   flipCtx = gsap.context(() => {
  //     const allStates = gsap.utils.toArray('.tomato') as HTMLElement[];

  //     const state = Flip.getState(allStates);
  //     states.forEach((tomatoElement, index) => {
  //       tomatoElement?.classList.remove(...classes[index]);
  //     });
  //     const flip = Flip.to(state, {
  //       duration: 2,
  //       ease: 'power1.inOut',
  //       // stagger: 0.1,
  //       rotate: 400,
  //       onComplete: () => console.log('done'),
  //     });
  //     ScrollTrigger.create({
  //       trigger: ggg,
  //       start: 'top center',
  //       end: '+=20%',
  //       animation: flip,
  //       // pin: true,
  //       scrub: true,
  //       markers: true,
  //     });
  //   });
  // }
  // anim();

  // const tl = gsap.timeline();
  // tl.to(highliter, {
  //   backgroundSize: '100% 100%',
  //   ease: 'back.in',
  //   duration: 3,
  // })
  //   .fromTo(
  //     herb1,
  //     {
  //       rotate: '10deg',
  //     },
  //     {
  //       rotate: '0deg',
  //       repeat: 3,
  //       yoyo: true,
  //     }
  //   )
  //   .fromTo(
  //     herb2,
  //     {
  //       rotate: '185deg',
  //     },
  //     {
  //       rotate: '180deg',
  //       repeat: 3,
  //       yoyo: true,
  //     },
  //     '<'
  //   );
  // items.forEach((item) => {
  //   gsap.to(item, {
  //     rotate: 360,
  //     scrollTrigger: {
  //       scroller: section,
  //       trigger: item,
  //       start: 'top bottom',
  //       scrub: true,
  //     },
  //   });
  // });
};
export const animateAuthOut = (href: string, router: AppRouterInstance) => {
  const items = document.querySelectorAll('.enterAnimation');
  const items1 = document.querySelectorAll('.enterAnimation1');
  const tl = gsap.timeline();
  tl.fromTo(
    items,
    {
      y: 0,
      opacity: 1,
    },
    { y: -50, stagger: 0.2, ease: 'back.out', opacity: 0, position: 'relative' }
  ).fromTo(
    items1,
    {
      y: 0,
      opacity: 1,
    },
    {
      y: -50,
      stagger: 0.2,
      opacity: 0,
      ease: 'back.out',
      position: 'relative',
      onComplete: () => {
        router.push(href);
      },
    },
    '='
  );
};
export const animateAuthEnter = () => {
  const items = document.querySelectorAll('.enterAnimation');
  const items1 = document.querySelectorAll('.enterAnimation1');
  const tl = gsap.timeline();
  tl.fromTo(
    items,
    {
      y: -50,
      opacity: 0,
    },
    { y: 0, stagger: 0.2, ease: 'back.out', opacity: 1, position: 'relative' }
  ).fromTo(
    items1,
    {
      y: -50,
      opacity: 0,
    },
    { y: 0, stagger: 0.2, ease: 'back.out', opacity: 1, position: 'relative' },
    '='
  );
};
