'use client';

import { useEffect } from 'react';
import { animateAuthEnter } from '../animation';
import { usePathname, useRouter } from 'next/navigation';
import { CircleCheck } from 'lucide-react';
// import { animatePageOut } from '@/app/animation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pageType = usePathname();
  const router = useRouter();
  useEffect(() => {
    animateAuthEnter();
    // animateAuth(pageType, router);
  }, []);

  return (
    <>
      {children}
      {/* <div className="flex gap-10 justify-center items-center section-min-height">
        <div className="w-[450px]">{children}</div>
        <div id="container" className="h-[400px] w-20 relative ">
          <div
            id="layer1"
            className=" w-full h-[45px] absolute bg-[url(/bread2.svg)] bg-contain bg-no-repeat bg-center z-[4] top-[0px]"
          >
            
          </div>
          <div
            id="layer2"
            className="w-full h-[29px] absolute bg-[url(/cheese.svg)] bg-contain bg-no-repeat bg-center z-[3] top-[127px]"
          ></div>
          <div
            id="layer3"
            className="w-full h-[27px] absolute bg-[url(/meat.svg)] bg-contain bg-no-repeat bg-center z-[2] top-[235px]"
          ></div>
          <div className="w-full h-[32px] absolute bg-[url(/bread1.svg)] bg-contain bg-no-repeat bg-center z-[1] top-[343px]"></div>
        </div>
        <div id="container1" className="h-[400px] w-20 relative ">
          <div id="tick1" className=" w-full h-[45px] absolute   top-[0px]">
           
            <CircleCheck color="grey" />
          </div>
          <div id="tick2" className="w-full h-[29px] absolute  top-[127px]">
            <span
              className="w-[24px] h-[20px] px-[6px] pb-[1px] text-center rounded-[50%]"
              style={{ border: '2px solid white' }}
            >
              2
            </span>
          </div>
          <div id="tick3" className="w-full h-[27px] absolute   top-[235px]">
            <span
              className="w-[24px] h-[20px] px-[6px] pb-[1px] text-center rounded-[50%]"
              style={{ border: '2px solid white' }}
            >
              3
            </span>
          </div>
          <div className="w-full h-[32px] absolute top-[343px]">
            <span
              className="w-[24px] h-[20px] px-[6px] pb-[1px] text-center rounded-[50%]"
              style={{ border: '2px solid white' }}
            >
              4
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
}
