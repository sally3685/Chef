'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Ingredients, TimeForCooking } from '@prisma/client';
import { getOneRecipy } from '@/data-access/recipies';
import Loading from '@/app/[typeId]/loading';
import { useLayoutEffect } from 'react';
import ErrorPage from '@/app/[typeId]/error';
const foodimage = () => {
  const img = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.wood',
        {
          rotate: 0,
          transformOrigin: '50% 50%',
        },
        {
          rotate: 360,
          transformOrigin: '50% 50%',
          scrollTrigger: {
            scrub: true,
          },
        }
      ); // <- scopes all selector text to the root element
    });
    return () => ctx.revert();
  });

  const params = useParams();
  const { recipyId } = params;

  type reci = {
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
    classification: string;
    authorId: string;
    timeForCooking: TimeForCooking | null;
    ingredients: Ingredients[];
  };
  const [recipe, setRecipe] = useState<reci>();

  const slug = decodeURIComponent(recipyId as string);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');

  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // setItemsArray([]);
    const fetchData = async () => {
      setFetchLoad(true);
      const slug1 = decodeURIComponent(recipyId as string);
      const a = await getOneRecipy(slug1);
      if (a.status === 500) setError(a.message as string);
      else setRecipe(a.recipy as reci);
      setFetchLoad(false);
      // setItemsArray(a);
    };

    fetchData();
    setError(null);
  }, [refresh]);
  return (
    <>
      <div className="relative   flex justify-start items-center flex-col h-full mt-4">
        <div
          aria-label="img"
          className={`
               relative 
          w-full h-full
          bg-[url(/wooden.png)]
          overflow-hidden
          bg-contain bg-no-repeat bg-center
              rounded-[50%] `}
        >
          {!isFetchLoad && error ? (
            <ErrorPage
              error={new Error(error)}
              reset={() => {
                setRefresh(!refresh);
                router.refresh();
              }}
            ></ErrorPage>
          ) : !isFetchLoad && recipe ? (
            <div
              ref={img}
              aria-label="img"
              style={{
                background: `url(${recipe.src}) center/contain no-repeat`,
              }}
              className="
               relative 
               w-[83%] h-[90%] top-[5%] -left-[7%]
               wood
               rounded-[50%] 
               "
            ></div>
          ) : (
            <div className="w-full top-[17%] h-[60%] relative ">
              <Loading></Loading>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default foodimage;
//  lg:w-[] lg:h-[] '0 0 20px 5px black'
