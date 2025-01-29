'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Menu from './Menu';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useAnimation } from '@/helpers/useAnimation';
import { useLayoutEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/app/assets/css/content.module.css';
const food = [
  {
    id: '1',
    title: 'أشهى وصفات الغداء',
    vid: '/v1.mp4',
  },
  {
    id: '2',
    title: 'أشهى وصفات الفطور',
    vid: '/v4.mp4',
  },
  {
    id: '3',
    title: 'أشهى وصفات الحلويات',
    vid: '/v5.mp4',
  },
  {
    id: '4',
    title: 'أشهى وصفات مشروبات',
    vid: '/v3.mp4',
  },
];

export default function Home() {
  const cardRef2 = useRef<HTMLDivElement | null>(null);
  const cardRef3 = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const highliter = document.querySelectorAll('.highliter');
      const herb1 = document.querySelectorAll('.herb1');
      const herb2 = document.querySelectorAll('.herb2');
      let mm = gsap.matchMedia();

      mm.add('(max-width:1023px)', () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: 'back.in', duration: 1 });

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: '.gggh',
            start: 'top 10%',
            end: '+=300px',
            scrub: true,
            pin: true,
          },
        });
        tl2
          .fromTo(
            cardRef3.current,
            {
              translateX: -5,
              opacity: 0,
            },
            {
              opacity: 1,
              translateX: 0,
              zIndex: 1,
            }
          )
          .fromTo(
            cardRef2.current,
            {
              translateX: -5,
              opacity: 0,
            },
            {
              opacity: 1,
              translateX: 0,
              zIndex: 1,
            }
          );
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
    });
    return () => ctx.revert();
  });

  return (
    <>
      <main className=" section-height w-full">
        <section
          ref={containerRef}
          className={`${styles.sec1} relative max-w-7xl mx-auto section-height flex flex-col justify-evenly items-center gggh`}
        >
          <div className={`space-y-6  w-full text-center px-4 `}>
            <div className="textup inline-block overflow-hidden ">
              <h1 className="sm:text-3xl text-2xl font-bold">
                {/* {food[parseInt(t) - 1].title} */}
                أشهى الوصفات
              </h1>
            </div>

            <article className="space-y-2 dark:text-[#ffffffe7] text-[#111111] ">
              <p className="sm:text-2xl text-xl textup1 inline-block overflow-hidden dark:text-[#ffffffe7] text-[#111111]">
                من الآن فصاعدًا لا مزيد من الحيرة والجوع ..
              </p>
              <br />
              <p
                style={{ lineHeight: 2 }}
                className={` sm:text-2xl text-xl textup2 inline-block overflow-hidden `}
              >
                يقدم مطبخنا أشهى الأطباق بأحدث الوصفات{' '}
                <span
                  className="relative bg-gradient-to-l dark:from-[#bc7f37] dark:to-[#bc7f37] 
                from-[#f3a738] to-[#f3a738]
                bg-no-repeat bg-[length:0%_100%]  bg-[right]  highliter"
                >
                  فليستيقظ الشيف بداخلك وليطلق العنان
                </span>
              </p>
            </article>
          </div>
          <div
            className={`  relative  flex w-full h-1/2 justify-center items-center`}
          >
            <div
              ref={cardRef3}
              className={`${styles.card1} lg:!opacity-100 absolute lg:relative card w-[80%] md:w-[60%]  lg:!translate-x-0 lg:!translate-y-0  translate-y-1 bg-[#bc7f37] dark:bg-[#ce8538] h-full lg:w-1/3 rounded-3xl lg:-ml-8 lg:!z-[-1] lg:transform-none transform lg:scale-[0.9] box1 overflow-hidden flex flex-col justify-evenly items-center dark:border dark:border-x-2 dark:border-y-2 border-[#bc7f37] `}
            >
              <h2 className="sm:text-xl text-lg text-[#151517] text-center">
                أكثر الشيفات متابعة
              </h2>
              <Image
                className={`
              w-[188px] h-[56%]  dark:shadow-[0_0_20px_5px_black] shadow-[0_0_20px_5px_white] rounded-[50%] `}
                src="/profile.jfif"
                alt="wooden"
                width="251"
                height="543"
              ></Image>
              <h2 className="sm:text-xl text-lg text-[#151517] text-center p-3">
                الشيف{' '}
                <span className="text-black dark:text-green-500 font-bold ">
                  حمودة البطل{' '}
                </span>{' '}
                بعدد مشتركين{' '}
                <span className="text-black dark:text-green-500 font-bold ">
                  1200k
                </span>
              </h2>
            </div>
            <div
              ref={cardRef2}
              className={`absolute  card w-[80%] md:w-[60%]  lg:!translate-x-0 lg:!opacity-100 translate-y-4 lg:!translate-y-0  h-full lg:w-1/3 rounded-3xl lg:relative flex justify-center items-center flex-col text-center box2 transform lg:transform-none bg-[#b25518] text-white ${styles.card2}`}
            >
              {/* <div className="bg-[url(/ss.png)] bg-no-repeat bg-cover bg-center absolute w-[106%] h-[119%] z-[-1]"></div> */}
              <h2 className="font-bold px-12 sm:text-xl text-lg">
                أكثر من مئة وصفة وأكثر من عشرين شيف محترف ماذا تنتظر <br />
                <span className="hover:text-[#f9751eaf] transition-all duration-600 hover:cursor-pointer">
                  انضم الينا الآن
                </span>
              </h2>
              <Image
                className="w-[40%] h-[50%] -bottom-0 right-0 absolute herb1"
                src="/herb1.png"
                alt="herb1"
                width="350"
                height="258"
              ></Image>
              <Image
                className="w-[40%] h-[50%] -top-0 left-0 absolute transform rotate-[180deg] herb2"
                src="/herb1.png"
                alt="herb1"
                width="350"
                height="258"
              ></Image>
            </div>
            <div
              className={`absolute lg:relative card w-[80%] md:w-[60%]  lg:!translate-x-0 lg:!translate-y-0 translate-y-7   text-center bg-[#bc7f37] dark:bg-[#d3b577] h-full lg:w-1/3 rounded-3xl lg:-mr-8 lg:!z-[-1] box1 lg:transform-none transform lg:scale-[0.9] overflow-hidden flex flex-col justify-evenly items-center  dark:border dark:border-x-2 dark:border-y-2 border-[#bc7f37]  ${styles.card3}`}
            >
              <h2 className="sm:text-xl text-lg text-[#151517]">
                أعلى الوصفات تقييمًا
              </h2>
              <Image
                className={`
              w-[188px] h-[56%]  dark:shadow-[0_0_20px_5px_black] shadow-[0_0_20px_5px_white] rounded-[50%] `}
                src="/wooden.png"
                alt="wooden"
                width="251"
                height="543"
              ></Image>
              <Image
                className={`
              w-[158px] h-[45%]   absolute`}
                src="/breakfast6.png"
                alt="wooden"
                width="251"
                height="543"
              ></Image>
              <h2 className="sm:text-xl text-lg text-[#151517]">
                توست الخضار بتقييم{' '}
                <span className="text-black dark:text-green-500 font-bold ">
                  80%
                </span>
              </h2>
            </div>
          </div>
        </section>
      </main>
      <div className="h-[300px] w-full lg:!h-0 lg:!w-0"></div>
    </>
  );
}
