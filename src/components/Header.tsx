'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useAnimation } from '@/helpers/useAnimation';
import { useLayoutEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import ThemeSwitch from './ThemeSwitch';
export default function Header() {
  const { isSignedIn } = useUser();
  console.log('User signed in:', isSignedIn);
  const food = [
    {
      id: '1',
      title: ' الغداء',
      link: '/lunch',
      params: 'lunch',
    },
    {
      id: '2',
      title: ' فطور',
      link: '/breakfast',
      params: 'breakfast',
    },
    {
      id: '3',
      title: ' حلويات',
      link: '/sweet',
      params: 'sweet',
    },
    {
      id: '4',
      title: ' مشروبات',
      link: '/drinks',
      params: 'drinks',
    },
  ];
  const [clicked, setClicked] = useState(false);
  const navMobileSection = useRef<HTMLDivElement | null>(null);
  const droppingMainNavBtn = useRef<HTMLButtonElement | null>(null);
  const up = useRef<HTMLDivElement | null>(null);
  const down = useRef<HTMLDivElement | null>(null);
  const middle = useRef<HTMLDivElement | null>(null);
  const listItems = useRef<HTMLAnchorElement | null>(null);
  //  https://stackademic.com/blog/how-to-use-gsap-with-nextjs-14-and-ssr
  const tl = useRef(gsap.timeline({ paused: true }));
  // const tl2 =;
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('.listItems', { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(middle.current, {
          background: 'none',
        })
        .to(
          up.current,
          {
            translateX: 0,
            translateY: -1,
            rotate: 45,
          },
          '<'
        )
        .to(
          down.current,
          {
            translateY: 0,
            translateX: -1,
            rotate: -45,
          },
          '<'
        )
        .fromTo(
          navMobileSection.current,
          {
            translateX: '-100%',
          },
          {
            translateX: 0,
            immediateRender: false,
            ease: 'back.in',
            duration: 0.5,
          }
        )
        .fromTo(
          '.listItems',
          {
            translateY: -10,
          },
          { translateY: 0, stagger: 0.2, ease: 'back.out' }
        );
    });
    return () => ctx.revert();
  }, []);

  useAnimation(() => {
    if (clicked) {
      tl.current.play();
    } else tl.current.reverse();
  }, [clicked]);

  const handleBtnNav = () => {
    // clicked = !clicked;
    setClicked(!clicked);
  };

  const pathName = usePathname();
  useEffect(() => {
    setClicked(false);
  }, [pathName]);
  return (
    <header className=" sticky top-0 z-10  text-black ">
      <section className="max-w-7xl h-[55px]  z-[00]  p-4 flex justify-between items-center bg-stone-100 dark:bg-[#d3b577] rounded-3xl relative top-[18px] mx-auto">
        <div className="flex justify-end items-end gap-4">
          <Image
            className="transform -translate-y-2"
            src="/logo.svg"
            alt="My SVG Image"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-bold bottom-0 sm:text-4xl  text-black">
            الشيف
          </h1>
          <ThemeSwitch></ThemeSwitch>
        </div>
        <button
          className="lg:hidden block cursor-pointer"
          ref={droppingMainNavBtn}
          onClick={handleBtnNav}
        >
          <div
            ref={middle}
            className="transition-all duration-500 w-8 h-1 relative bg-black dark:bg-white rounded 
           
          "
          >
            <div
              ref={down}
              className="absolute bg-black w-8 h-1 top-0 transform translate-x-4 translate-y-3 dark:bg-white"
            ></div>
            <div
              ref={up}
              className="absolute bg-black w-8 h-1 bottom-0 transform -translate-y-3 translate-x-4 dark:bg-white"
            ></div>
          </div>
        </button>
        <nav
          className="lg:flex hidden justify-between w-1/2 text-xl "
          aria-label="main"
        >
          {food.map((type, ti) => (
            <Link key={ti} href={`${type.link}`}>
              {type.title}
            </Link>
          ))}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href={`/sign-up`}>انشاء حساب</Link>
          )}
        </nav>
      </section>
      <section
        ref={navMobileSection}
        className="z-[-1] fixed w-full transform translate-x-[100%]  top-[0px]  min-h-screen  before:bg-center before:bg-cover  dark:bg-[#151517] bg-[#f5f5f4]  before:absolute before:content[''] before:top-0 before:left-0  before:bg-[url(/w1.jpg)] before:w-full before:h-full before:opacity-5 before:z-[0] flex justify-center items-center text-white"
      >
        <nav
          className="flex justify-center flex-col gap-10 mt-20 items-center text-3xl h-full"
          aria-label="mobile"
        >
          <a
            href="/"
            className={`listItems font-medium hover:scale-[1.3]   ${
              pathName.split('/')[1] === ''
                ? 'text-[#f3a738] dark:text-[#f3e37c]'
                : ''
            }`}
          >
            الصفحة الرئيسية
          </a>
          {food.map((type, ti) => (
            <Link
              ref={listItems}
              key={ti}
              href={`${type.link}`}
              className={`listItems font-medium hover:scale-[1.3]   ${
                pathName.split('/')[1] === type.params
                  ? 'text-[#f3a738] dark:text-[#f3e37c]'
                  : ''
              }`}
            >
              {type.title}
            </Link>
          ))}
        </nav>
      </section>
    </header>
  );
}
