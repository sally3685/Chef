'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useAnimation } from '@/helpers/useAnimation';
import styles from '@/app/assets/css/menu.module.css';
// import itemsArray from '../detailes/[recipyId]/items';

import { useUser } from '@clerk/nextjs';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Trash2, PenBoxIcon } from 'lucide-react';
import Flip from 'gsap/dist/Flip';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/all';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TimeForCooking, Ingredients, User } from '@prisma/client';
import { getRecipy } from '@/data-access/recipies';
import { useParams } from 'next/navigation';
import Loading from '@/app/[typeId]/loading';

import ErrorPage from '../error';
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
type reci = {
  author: User;
  title: string;
  slug: string;
  additional: string | null;
  src: string;
  steps: string[];
  service: number | null;
  decorePhoto: string;
  type: string;
  color: string;
  rate: number;
  authorId: string;
  timeForCooking: TimeForCooking | null;
  ingredients: Ingredients[];
};
export default function Menu({ typeId }: { typeId: string }) {
  const isColorDark = (hexColor: string) => {
    // Remove the # symbol from the hex color and convert it to RGB values
    const red = parseInt(hexColor.substring(1, 3), 16);
    const green = parseInt(hexColor.substring(3, 5), 16);
    const blue = parseInt(hexColor.substring(5, 7), 16);

    // Calculate the relative luminance using the formula for sRGB color space
    const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

    // Check if the luminance value corresponds to a dark color
    return luminance <= 0.5;
  };
  // const params = useParams();
  const [type, setType] = useState('');
  const [searchType, setSearchType] = useState('recipeName');
  const [loa, setLoa] = useState(false);
  const [itemsArray, setItemsArray] = useState<reci[]>([]);
  let pathname = usePathname();
  if (
    !(typeId === 'lunch') &&
    !(typeId === 'breakfast') &&
    !(typeId === 'sweet') &&
    !(typeId === 'drinks')
  ) {
    return;
  }

  const { user, isLoaded } = useUser();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [typeFocus, setTypeFocus] = useState(false);
  const typeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);
  const [refresh, setRefresh] = useState(false);
  const [isFetchLoad, setFetchLoad] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // setItemsArray([]);
    const getItems = async () => {
      setFetchLoad(true);
      const a = await getRecipy(typeId);
      if (a.status === 500) setError(a.message as string);
      else setItemsArray(a.recipies as reci[]);
      setFetchLoad(false);
      // setItemsArray(a);
    };

    getItems();
    setError(null);
  }, [typeId, refresh, pathname]);

  useAnimation(() => {
    if (typeof window !== 'undefined') {
      const items = document.querySelectorAll('.item');
      let ctx = gsap.context(() => {
        items.forEach((item) => {
          gsap.fromTo(
            item,
            {
              opacity: 0.5,
            },
            {
              opacity: 1,
            }
          );
        });
      });
      return () => ctx.revert();
    }
  }, [type]);
  // useAnimation(() => {
  //   let ctx = gsap.context(() => {});
  //   return () => ctx.revert();
  // }, []);
  useAnimation(() => {
    if (typeof window !== 'undefined') {
      const states = document.querySelectorAll('.tomato');
      const items = document.querySelectorAll('.wood');
      const section = document.querySelector('.section');
      let ctx = gsap.context(() => {
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
        });
        ScrollTrigger.create({
          trigger: '.ggg',
          start: 'top center',
          end: '+=20%',
          animation: flip,
          // pin: true,
          scrub: true,
        });
        items.forEach((item) => {
          gsap.to(item, {
            rotate: 360,
            opacity: 1,
            scrollTrigger: {
              scroller: section,
              trigger: item,
              start: 'top bottom',
              scrub: true,
            },
          });
        });
      });
      return () => ctx.revert();
    }
  }, [isLoaded, loa]);
  useEffect(() => {
    setTypeFocus(true);
    typeRef.current?.focus();
  }, []);
  if (error) {
    const ee = new Error(error);
    return (
      <ErrorPage
        error={ee}
        reset={() => {
          setRefresh(!refresh);
          router.refresh();
        }}
      ></ErrorPage>
    );
  } else {
    return (
      <>
        {isLoaded === false || isFetchLoad ? (
          <Loading />
        ) : (
          <main
            className="relative  overflow-hidden 
         w-full flex justify-evenly items-center flex-col 
      "
          >
            <>
              <section className=" relative mx-auto p-4 w-full  max-w-7xl flex flex-col justify-center items-center sm:mx-auto  z-[3]">
                <div className=" max-w-6xl w-full mx-auto ">
                  <search
                    className={`lg:w-1/2 w-[95%] mx-auto justify-center items-center gap-3 flex `}
                  >
                    <Search size={38} color="#f99f1e"></Search>
                    <input
                      ref={typeRef}
                      value={type}
                      placeholder={
                        searchType === 'userName'
                          ? 'محمد القباقبجي'
                          : 'متبل حمص'
                      }
                      onChange={(e) => setType(e.target.value)}
                      type="text"
                      className="bg-white p-2 w-full text-black focus:outline-orange-500 focus:outline-2 outline-none rounded "
                      onFocus={() => setTypeFocus(true)}
                      onBlur={() => setTypeFocus(false)}
                    />
                    <select
                      id="type"
                      name="type"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      aria-describedby="classnote"
                      className=" !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none w-1/2"
                    >
                      <option value="userName">حسب الشيف</option>
                      <option value="recipeName">حسب الوصفة</option>
                    </select>
                  </search>
                </div>

                <div
                  className="max-w-6xl w-full mx-auto p-6 relative section min-h-[304px]
        mt-12 flex flex-wrap gap-10 justify-center items-center h-full overflow-y-scroll shadow-[0_0_11px_4px_#00000070]"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#f3a738 transparent',
                  }}
                >
                  {isFetchLoad ? (
                    <>
                      <Loading></Loading>
                    </>
                  ) : (
                    <>
                      {user ? (
                        <Link
                          href={`${typeId}/add-recipy`}
                          className="relative p-4 
           w-72 h-64  item flex justify-center items-center hover:cursor-pointer  scale-[0.9]"
                        >
                          <div
                            className="w-52 h-10 rounded-3xl bg-gradient-to-b from-[#b25518] to-[#ce8538] "
                            title="اضف وصفتك 💛"
                          ></div>
                          <div
                            title=" اضف وصفتك 💛"
                            className="w-10 h-48 rounded-3xl bg-gradient-to-b from-[#ce8538] to-[#b25518] transform rotate-180 absolute"
                          ></div>
                        </Link>
                      ) : (
                        <div
                          className="relative p-4 
                        w-72 h-64  item flex justify-center items-center hover:cursor-pointer  scale-[0.9]"
                        >
                          سجل دخول واضف وصفتك الان 💛
                        </div>
                      )}
                      {itemsArray.length === 0 && (
                        <>
                          <p>لا يوجد وصفات بعد </p>
                        </>
                      )}

                      {itemsArray.length > 0 &&
                        itemsArray
                          ?.filter((item) => {
                            if (searchType === 'recipeName')
                              return item.title.includes(type);
                            else if (searchType === 'userName')
                              return item.author.userName.includes(type);
                          })
                          .map((item, index1) => (
                            <div
                              key={index1}
                              className={`relative p-4 w-[288px] h-[280px] item ${styles.cardDiv}`}
                            >
                              <svg
                                className="absolute z-[-2] w-full h-full"
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

                                    <stop
                                      offset="100%"
                                      stopColor={`${item.color}`}
                                    />
                                  </linearGradient>
                                </defs>
                                <g id="Layer_2" data-name="Layer 2">
                                  <g id="Layer_1-2" data-name="Layer 1">
                                    <path
                                      style={{ fill: `${item.color}` }}
                                      d="M282.77,316.13H33.48A33.36,33.36,0,0,1,.13,282.77V33.48A33.35,33.35,0,0,1,33.48.13H282.77a33.36,33.36,0,0,1,33.36,33.35L296.08,135.81a128.54,128.54,0,0,0,.24,50.58l19.81,96.38A33.37,33.37,0,0,1,282.77,316.13Z"
                                    />
                                  </g>
                                </g>
                              </svg>

                              <div className="relative   flex justify-between flex-col w-[256px] h-[248px] mt-[15px]">
                                <Image
                                  className={`
              sm:w-56 sm:h-52 w-[224px] h-[208px] absolute shadow-[0_0_20px_5px_black] rounded-[50%] -left-[37px] -top-[25px]`}
                                  src="/wooden.png"
                                  alt="wooden"
                                  width="251"
                                  height="543"
                                ></Image>
                                <Image
                                  className={`
              w-[50px] h-[50px]  absolute  right-[34px] top-[21px] z-[-1] transform -rotate-45`}
                                  src={item ? `/${item.decorePhoto}` : ''}
                                  alt={item ? `decore` : ''}
                                  width="251"
                                  height="543"
                                ></Image>
                                <Image
                                  className={`
              w-[45px] h-[45px]  absolute  right-[55px] top-[137px] z-[-1] transform rotate-45`}
                                  src={item ? `/${item.decorePhoto}` : ''}
                                  alt={item ? `decore` : ''}
                                  width="251"
                                  height="543"
                                ></Image>
                                <Image
                                  className={`
              w-[178px] h-[178px]  wood relative right-[92px] top-[-9px]`}
                                  src={item ? `${item.src}` : ''}
                                  alt={item ? item.title : ''}
                                  unoptimized
                                  width="251"
                                  height="543"
                                ></Image>

                                <a href={`/${typeId}/detailes/${item.slug}`}>
                                  <h2
                                    className={`text-lg sm:text-xl pt-2 hover:opacity-40  text-center w-full relative left-[-1rem] ${
                                      item.authorId !== user?.id
                                        ? 'm-[revert]'
                                        : 'mt-[8px]'
                                    } 
                              ${
                                isColorDark(item.color)
                                  ? 'text-white'
                                  : 'text-black'
                              }
                              `}
                                  >
                                    {item.title}
                                  </h2>
                                </a>
                                {item.authorId === user?.id ? (
                                  <div
                                    className={`flex w-full justify-evenly items-center mt-3 opacity-40
                              ${
                                isColorDark(item.color)
                                  ? 'text-white'
                                  : 'text-[#000000]'
                              }
                            `}
                                  >
                                    <Link
                                      href={`${typeId}/delete-recipe/${item.slug}`}
                                    >
                                      <Trash2></Trash2>
                                    </Link>
                                    <Link
                                      href={`${typeId}/update-recipe/${item.slug}`}
                                    >
                                      <PenBoxIcon></PenBoxIcon>
                                    </Link>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ))}
                    </>
                  )}
                </div>
              </section>
              <section
                className={`${
                  styles.cardTDiv
                } max-h-[calc(100vh - 68px)] h-[400px] flex justify-start items-center  max-w-6xl p-[15px] m-2 mb-4 ${
                  typeId === 'breakfast'
                    ? 'dark:bg-[#d3b57778] bg-[#d3b577] '
                    : typeId === 'sweet'
                    ? 'dark:bg-[#fec29d78] bg-[#fec29d] '
                    : typeId === 'lunch'
                    ? 'dark:bg-[#c38b5078] bg-[#c38b50] '
                    : 'dark:bg-[#e9e7c678] bg-[#e9e7c6] '
                } rounded-xl relative
              
              `}
              >
                <div className="flex flex-col gap-4 z-[2] w-full lg:w-[80%] ">
                  <h1 className="text-xl lg:text-2xl font-bold">
                    نصيحة اليوم{' '}
                  </h1>
                  <p className="text-lg">
                    {typeId === 'breakfast'
                      ? 'اختر خيارات صحية للفطور مثل الشوفان المحضر بالحليب الخالي الدسم والفواكه الطازجة أو الزبادي الطبيعي مع العسل والمكسرات.💛'
                      : typeId === 'sweet'
                      ? ' جرب تناول الحلويات الصحية مثل الفواكه الموسمية، التمر، المكسرات، أو الحلويات المحضرة بالطرق الصحية وباستخدام المكونات الطبيعية.💜'
                      : typeId === 'lunch'
                      ? 'حاول تناول وجبة متوازنة تحتوي على البروتين، الخضروات، والكربوهيدرات الصحية مثل الأرز البني أو الخبز الكامل.🧡'
                      : ' تجنب المشروبات الغازية العالية بالسكر والدهون، واختر المياه والعصائر الطبيعية أو الشاي الأخضر دون إضافة سكر كبديل صحي.💙'}
                  </p>
                </div>
                <div
                  ref={containerRef}
                  className={`lg:opacity-100 opacity-40 grid grid-cols-10 grid-rows-10 md:w-[50%] w-[88%] z-[1] h-full left-0 top-0 absolute ggg p-2 ${styles.cardTT}`}
                >
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenT.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coconut.svg) '
                          : typeId === 'sweet'
                          ? 'url(/pancake.svg) '
                          : 'url(/bread.svg) ',
                    }}
                    className={`tomato row-span-2 col-span-2 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenL_2.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coffeeBean.svg) '
                          : typeId === 'sweet'
                          ? 'url(/minicake_2.svg) '
                          : 'url(/vi_1.svg) ',
                    }}
                    className={`tomato row-span-1 col-span-1 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenB.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coconut.svg) '
                          : typeId === 'sweet'
                          ? 'url(/pancake.svg) '
                          : 'url(/bread.svg) ',
                    }}
                    className={`tomato row-span-2 col-span-2 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenL_2.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coffeeBean.svg) '
                          : typeId === 'sweet'
                          ? 'url(/minicake_2.svg) '
                          : 'url(/vi_1.svg) ',
                    }}
                    className={`tomato row-span-1 col-span-1 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenL_2.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coffeeBean.svg) '
                          : typeId === 'sweet'
                          ? 'url(/minicake_2.svg) '
                          : 'url(/vi_1.svg) ',
                    }}
                    className={`tomato row-span-1 col-span-1 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenT.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coconut.svg) '
                          : typeId === 'sweet'
                          ? 'url(/pancake.svg) '
                          : 'url(/bread.svg) ',
                    }}
                    className={`tomato row-span-2 col-span-2 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenL_2.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coffeeBean.svg) '
                          : typeId === 'sweet'
                          ? 'url(/minicake_2.svg) '
                          : 'url(/vi_1.svg) ',
                    }}
                    className={`tomato row-span-1 col-span-1 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/chickenL_2.svg) '
                          : typeId === 'drinks'
                          ? 'url(/coffeeBean.svg) '
                          : typeId === 'sweet'
                          ? 'url(/minicake_2.svg) '
                          : 'url(/vi_1.svg) ',
                    }}
                    className={`tomato row-span-1 col-span-1 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center `}
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/mayoSouce.svg) '
                          : typeId === 'drinks'
                          ? 'url(/iceCube.svg) '
                          : typeId === 'sweet'
                          ? 'url(/minicake_2.svg) '
                          : 'url(/cheeseTriangle.svg) ',
                    }}
                    className="tomato row-span-2 col-span-2 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center  scale-50"
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/katchup.svg) '
                          : typeId === 'drinks'
                          ? 'url(/iceCube.svg) '
                          : typeId === 'sweet'
                          ? 'url(/cake.svg) '
                          : 'url(/cheeseTriangle.svg) ',
                    }}
                    className="tomato row-span-2 col-span-2 row-start-1 col-start-10  bg-contain bg-no-repeat bg-center  scale-75"
                  ></div>
                  <div
                    style={{
                      backgroundImage:
                        typeId === 'lunch'
                          ? 'url(/garlicSouce.svg) '
                          : typeId === 'drinks'
                          ? 'url(/iceCube.svg) '
                          : typeId === 'sweet'
                          ? 'url(/cake.svg) '
                          : 'url(/cheeseTriangle.svg) ',
                    }}
                    className="tomato row-span-2 col-span-2 row-start-1 col-start-10 bg-contain bg-no-repeat bg-center  scale-75"
                  ></div>
                </div>
              </section>
            </>
          </main>
        )}
      </>
    );
  }
}
