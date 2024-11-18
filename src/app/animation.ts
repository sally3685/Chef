import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
// import { usePathname } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
const rots = [
  { ry: 0, rx: 0 },
  { ry: 90, rx: 0 },
  { ry: 180, rx: 0 },
  { ry: 270, rx: 0 },
  { ry: 0, rx: 90 },
  { ry: 0, rx: -90 },
];
export const animate = () => {
  const pathname = window.location.href;
  const faces = document.querySelectorAll('.face');
  const cube = document.getElementById('cube');
  if (faces) {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'expo.inOut',
      },
    });
    // tl.set(faces, {
    //   rotateY: (i) => rots[i].ry,
    //   rotateX: (i) => rots[i].rx,
    //   transformOrigin: '50% 50% -150px',
    //   z: 150,

    //   // background: (i) => ` 0px -${i * 300}px`,
    // });
    if (pathname.includes('sign-up')) {
      tl.to(cube, {
        rotateX: 0,
        rotateY: -90,
      });
    } else if (pathname.includes('sign-in')) {
      tl.to(cube, {
        rotateX: 45,
        rotateY: -60,
      }).to(cube, {
        rotateX: -90,
        rotateY: 0,
      });
    } else if (pathname.includes('verify-email')) {
      tl.to(cube, {
        rotateX: 0,
        rotateY: -60,
      }).to(cube, {
        rotateX: 90,
        rotateY: 0,
      });
    } else if (pathname.includes('forgot-password')) {
      tl.to(cube, {
        rotateX: -45,
        rotateY: 60,
      }).to(cube, {
        rotateX: 0,
        rotateY: -180,
      });
    }
    // .to(cube, {
    //   rotateX: 0,
    //   rotateY: -180,
    // });
    // .to(cube, {
    //   rotateX: 0,
    //   rotateY: -270,
    // })
    // .to(cube, {
    //   rotateX: -90,
    //   rotateY: -360,
    // });
    // .to(cube, {
    //   rotateX: 90,
    //   rotateY: -360,
    // });
    // .to(cube, {
    //   rotateX: 0,
    //   rotateY: -360,
    // });
  }
  const highliter = document.querySelectorAll('.highliter');
  const textup = document.querySelectorAll('.textup');
  const textup1 = document.querySelectorAll('.textup1');
  const textup2 = document.querySelectorAll('.textup2');
  const box1 = document.querySelectorAll('.box1');
  const box2 = document.querySelectorAll('.box2');
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
  // const flip = Flip.from(state, {
  //   scrollTrigger: {
  //     trigger: tomato5,
  //     start: 'center center',
  //     end: 'bottom+=100% center',
  //     markers: { indent: 200 },
  //   },
  // });
  // const tl2 = gsap.timeline();
  // tl2.add(flip); // Add flip tween to a timeline
  // tl2.to(tomato, {
  //   // Random other tween
  //   rotate: 360,
  // });
  const tl = gsap.timeline();
  tl
    // .to(textup, {
    //   height: '45px',
    //   ease: 'back.in',
    // })
    //   .to(textup1, {
    //     height: '40px',
    //     ease: 'back.in',
    //   })
    //   .to(textup2, {
    //     height: '40px',
    //     ease: 'back.in',
    //   })
    .to(highliter, {
      backgroundSize: '100% 100%',
      ease: 'back.in',
      duration: 3,
    })
    // .to(box1, {
    //   scale: '0.9',
    // })
    // .to(box2, {
    //   scale: '1',
    // })
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
  // .fromTo(
  //   tomato5,
  //   {
  //     x: '-117px',
  //   },
  //   {
  //     x: '117px',
  //     duration: 3,
  //     rotate: '360deg',
  //     scrollTrigger: {
  //       start: 'top center',
  //       markers: true,
  //       scrub: true,
  //     },
  //   }
  // );
  // Loop through each item and set up a
  // Set up individual ScrollTriggers for each item within the section

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
export const animatePageOut = (href: string, router: AppRouterInstance) => {
  // const faces = document.querySelectorAll('.face');
  // const cube = document.getElementById('cube');
  // if (faces) {
  //   const tl = gsap.timeline({
  //     defaults: {
  //       duration: 1,
  //       ease: 'expo.inOut',
  //     },
  //   });
  // tl.set(faces, {
  //   rotateY: (i) => rots[i].ry,
  //   rotateX: (i) => rots[i].rx,
  //   transformOrigin: '50% 50% -150px',
  //   z: 150,
  // });
  // tl.to(cube, {
  //   rotateX: 0,
  //   rotateY: -90,
  //   onComplete: () => {
  //
  //   },
  // });
  //     .to(cube, {
  //       rotateX: 0,
  //       rotateY: -180,
  //     })
  //     .to(cube, {
  //       rotateX: 0,
  //       rotateY: -270,
  //     })
  //     .to(cube, {
  //       rotateX: -90,
  //       rotateY: -360,
  //     })
  //     .to(cube, {
  //       rotateX: 90,
  //       rotateY: -360,
  //     })
  //     .to(cube, {
  //       rotateX: 0,
  //       rotateY: -360,
  //       onComplete: () => {
  //       },
  //     });
  // }
  router.push(href);
};
