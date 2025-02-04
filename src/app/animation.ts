import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ScrollSmoother from 'gsap/all';

export const animateAuthOut = (href: string, router: AppRouterInstance) => {
  if (document) {
    const items = document.querySelectorAll('.enterAnimation');
    const items1 = document.querySelectorAll('.enterAnimation1');
    const tl = gsap.timeline();
    tl.fromTo(
      items,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -50,
        stagger: 0.2,
        ease: 'back.out',
        opacity: 0,
        position: 'relative',
      }
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
  }
};
export const animateAuthEnter = () => {
  if (document) {
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
      {
        y: 0,
        stagger: 0.2,
        ease: 'back.out',
        opacity: 1,
        position: 'relative',
      },
      '='
    );
  }
};
