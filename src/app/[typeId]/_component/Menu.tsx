'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import itemsArray from '../detailes/[recipyId]/items';
export default function Menu() {
  const pathname = usePathname();
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="grid grid-cols-10 grid-rows-10 w-[30%] h-[50%] left-0 top-0 absolute">
          <div className="tomato8 row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato7 row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato6 row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato4 row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato1 row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato2 row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato3 row-span-1 col-span-1 row-start-1 col-start-10 bg-[url(/tomato3.png)] bg-contain bg-no-repeat bg-center "></div>
          <div className="tomato9 row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato2.png)] bg-contain bg-no-repeat bg-center  scale-50"></div>
          <div className="tomato10 row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato2.png)] bg-contain bg-no-repeat bg-center  scale-75"></div>
          <div className="tomato5 row-span-2 col-span-2 row-start-1 col-start-10 bg-[url(/tomato2.png)] bg-contain bg-no-repeat bg-center  scale-75"></div>
        </div>
        <section className=" relative  max-w-6xl sm:mx-auto mx-8 ">
          <h2 className="my-12 text-3xl">وصفات متنوعة</h2>
          <div
            className="max-w-6xl mx-auto p-6 relative section
        mt-12 flex flex-wrap gap-10 justify-center items-center max-h-[80vh] overflow-y-scroll shadow-[0_0_11px_4px_#00000070]"
          >
            {itemsArray.map((item, index1) => (
              <div
                key={index1}
                className="relative p-4 
           w-72 h-64  item"
              >
                <svg
                  className="absolute z-[-2] "
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
                      {/* {`${item.color}`} */}
                      <stop offset="100%" stopColor="#f99e1e7b" />
                    </linearGradient>
                  </defs>
                  <title>Asset 3</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        style={{ fill: `url(#grad1)` }}
                        d="M282.77,316.13H33.48A33.36,33.36,0,0,1,.13,282.77V33.48A33.35,33.35,0,0,1,33.48.13H282.77a33.36,33.36,0,0,1,33.36,33.35L296.08,135.81a128.54,128.54,0,0,0,.24,50.58l19.81,96.38A33.37,33.37,0,0,1,282.77,316.13Z"
                      />
                    </g>
                  </g>
                </svg>

                <div className="relative flex justify-between flex-col h-full mt-4">
                  <Image
                    className={`
              w-56 h-52  absolute shadow-[0_0_20px_5px_black] rounded-[50%] -left-9 -top-6`}
                    src="/wooden.png"
                    alt="wooden"
                    width="251"
                    height="543"
                  ></Image>
                  <Image
                    className={`
              w-11 h-11  absolute  right-8 top-[10%] z-[-1] transform -rotate-45`}
                    src={item ? item.down : ''}
                    alt={item ? item.title : ''}
                  ></Image>
                  <Image
                    className={`
              w-11 h-11  absolute  right-12 top-[60%] z-[-1] transform rotate-45`}
                    src={item ? item.down : ''}
                    alt={item ? item.title : ''}
                  ></Image>
                  <Image
                    className={`
              w-40 h-40  relative -left-[40%] -top-[50]`}
                    src={item ? item.src : ''}
                    alt={item ? item.title : ''}
                  ></Image>

                  <button>
                    <a href={`${pathname}/detailes/${item.id}`}>
                      <h2 className="text-xl pt-2 hover:opacity-40">
                        {item.title}
                      </h2>
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
