'use client';
import React from 'react';
import Image from 'next/image';
import itemsArray from '@/app/[typeId]/detailes/[recipyId]/items';
import { useParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const foodimage = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
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
    );
  });
  const params = useParams();
  // console.log(params);
  const { recipyId } = params;
  let rec;
  if (recipyId) {
    rec = recipyId[0];
    // else rec=recipyId;
  } else return null;
  console.log(itemsArray[parseInt(rec) - 1].src.src);
  // const { recipyId } = await params;{ params }: { params: Props }
  return (
    <>
      <div className="relative   flex justify-start items-center flex-col h-full mt-4">
        <div
          aria-label="img"
          className={`
               relative 
          w-full h-full
          bg-[url(/wooden.png)]
          bg-contain bg-no-repeat bg-center
              rounded-[50%] `}
        >
          <div
            aria-label="img"
            style={{
              background:
                'url(/_next/static/media/breakfast1.54598777.png) center/contain no-repeat',
            }}
            className={`
               relative 
               w-[83%] h-[90%] top-[5%] -left-[7%]
               wood
               rounded-[50%] 
               `}
          ></div>
        </div>
      </div>
    </>
  );
};

export default foodimage;
//  lg:w-[] lg:h-[] '0 0 20px 5px black'
