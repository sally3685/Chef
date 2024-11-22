import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Layers2 } from 'lucide-react';

export const animate = () => {
  const highliter = document.querySelectorAll('.highliter');
  const items = document.querySelectorAll('.item');
  const herb1 = document.querySelectorAll('.herb1');
  const herb2 = document.querySelectorAll('.herb2');
  const tomato = document.querySelector('.tomato');
  const tomato1 = document.querySelector('.tomato1');
  const tomato2 = document.querySelector('.tomato2');
  const tomato3 = document.querySelector('.tomato3');
  const tomato4 = document.querySelector('.tomato4');
  const tomato6 = document.querySelector('.tomato6');
  const tomato7 = document.querySelector('.tomato7');
  const tomato8 = document.querySelector('.tomato8');
  const tomato9 = document.querySelector('.tomato9');
  const tomato10 = document.querySelector('.tomato10');
  const tomato5 = document.querySelector('.tomato5');
  const section = document.querySelector('.section');
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);
  const doFlip = () => {
    const state = Flip.getState(tomato);
    tomato?.classList.add('!row-start-6');
    tomato?.classList.add('!col-start-7');
    Flip.from(state, {
      rotate: 500,
      duration: 2,
    });
    // .to(tomato, {
    //   translateY: 300,
    //   rotate: 560,
    //   scrollTrigger: {
    //     trigger: tomato,
    //     start: 'top 150vh',
    //     scrub: true,
    //     markers: { indent: 150 },
    //   },
    // });

    const state1 = Flip.getState(tomato1);
    tomato1?.classList.add('!row-start-7');
    tomato1?.classList.add('!col-start-8');
    Flip.from(state1, {
      rotate: 500,
      duration: 2,
    });

    const state2 = Flip.getState(tomato2);
    tomato2?.classList.add('!row-start-9');
    tomato2?.classList.add('!col-start-7');
    Flip.from(state2, {
      rotate: 500,
      duration: 2,
    });

    const state3 = Flip.getState(tomato3);
    tomato3?.classList.add('!row-start-10');
    tomato3?.classList.add('!col-start-9');
    Flip.from(state3, {
      rotate: 500,
      duration: 2,
    });
    const state4 = Flip.getState(tomato4);
    tomato4?.classList.add('!row-start-4');
    tomato4?.classList.add('!col-start-9');
    Flip.from(state4, {
      rotate: 500,
      duration: 2,
    });
    const state5 = Flip.getState(tomato6);
    tomato6?.classList.add('!row-start-1');
    tomato6?.classList.add('!col-start-7');
    Flip.from(state5, {
      rotate: 500,
      duration: 2,
    });
    const state6 = Flip.getState(tomato7);
    tomato7?.classList.add('!row-start-2');
    tomato7?.classList.add('!col-start-4');
    Flip.from(state6, {
      rotate: 500,
      duration: 2,
    });
    const state7 = Flip.getState(tomato8);
    tomato8?.classList.add('!row-start-1');
    tomato8?.classList.add('!col-start-1');
    Flip.from(state7, {
      rotate: 500,
      duration: 2,
    });
    const state8 = Flip.getState(tomato9);
    tomato9?.classList.add('!row-start-1');
    tomato9?.classList.add('!col-start-9');
    Flip.from(state8, {
      rotate: 500,
      duration: 2,
    });
    const state9 = Flip.getState(tomato10);
    tomato10?.classList.add('!row-start-1');
    tomato10?.classList.add('!col-start-5');
    Flip.from(state9, {
      rotate: 500,
      duration: 2,
    });
    const state10 = Flip.getState(tomato5);
    tomato5?.classList.add('!row-start-4');
    tomato5?.classList.add('!col-start-7');
    Flip.from(state10, {
      rotate: 500,
      duration: 2,
      scrub: true,
    });
  };
  ScrollTrigger.create({
    trigger: tomato5,
    start: 'top center',
    end: 'bottom center',
    scrub: true,
    // markers: { indent: 150 },
    onEnter: () => doFlip(),
    onEnterBack: () => doFlip(),
  });
  const tl = gsap.timeline();
  tl.to(highliter, {
    backgroundSize: '100% 100%',
    ease: 'back.in',
    duration: 3,
  })
    .fromTo(
      herb1,
      {
        rotate: '10deg',
      },
      {
        rotate: '0deg',
        repeat: 3,
        yoyo: true,
      }
    )
    .fromTo(
      herb2,
      {
        rotate: '185deg',
      },
      {
        rotate: '180deg',
        repeat: 3,
        yoyo: true,
      },
      '<'
    );
  items.forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        scroller: section,
        trigger: item,
        start: 'top top',
        scrub: true,
      },
      scale: 0,
    });
  });
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
