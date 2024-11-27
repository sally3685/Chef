'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { updateQueryString } from '@/helpers/subNavigation';
import caloriesArray from '../calories';
import Image from 'next/image';
import itemsArray from '../items';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function Ingredients() {
  const params = useSearchParams();
  const ingre = params.get('ingredient');
  const cal = params.get('calories');
  const router = useRouter();
  const caloies = params.get('calories');
  const food = caloriesArray.find((e) => e.name === caloies);

  const pathName = usePathname();
  const { recipyId } = useParams();

  let rec;
  if (recipyId) {
    rec = recipyId[0]; // Assuming recipyId is an array
  } else {
    return null; // Return null if no recipyId is found
  }

  return (
    <>
      {ingre === 'true' ? (
        <section
          className=" section xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1 shadow-[0_0_11px_4px_#f3a738] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3a738] 
        dark:bg-transparent
        bg-[#f3a738]
         lg:row-span-3 lg:col-span-4 
      lg:row-start-1 lg:col-start-1
      sm:row-span-3 sm:col-span-5 
      sm:row-start-1 sm:col-start-1
      row-span-2 col-span-1 
      row-start-3 col-start-1
      p-6 text-xl space-y-4
      overflow-hidden
      xl:max-h-[692px]
      
      lg:max-h-[610px]
      
      sm:max-h-[740px]
      max-h-[670px]
      "
        >
          <>
            <div className="flex flex-col h-full justify-center gap-4 items-center">
              <div className="flex gap-2">
                <h2 className="text-xl sm:text-2xl dark:text-[#f3a738] text-white font-medium">
                  المكونات /
                </h2>
                <h2
                  className="dark:hover:text-[#f3a738] hover:text-white cursor-pointer text-lg sm:text-xl "
                  onClick={() => {
                    updateQueryString(pathName, router, [
                      { name: 'ingredient', value: 'true', type: 'delete' },
                    ]);
                  }}
                >
                  الوصفة
                </h2>
              </div>

              <>
                <h2 className="text-xl sm:text-2xl  dark:text-[#f3a738] text-white font-bold">
                  {itemsArray[parseInt(rec) - 1].title}
                </h2>

                <ul className="space-y-4 h-3/4 max-h-[3/4] overflow-y-scroll w-[100%]">
                  {caloriesArray.map(
                    ({ name, src, amount, additional, id }) => (
                      <li
                        key={id}
                        className="flex justify-between items-center border border-t-0 border-r-0 border-l-0 border-b-gray-200 p-2"
                      >
                        <div className="flex gap-4 items-center ">
                          <Image
                            src={src}
                            alt={name}
                            className="w-[25%] sm:w-[100px]"
                          ></Image>
                          <p className="text-lg sm:text-xl ">
                            {name}: {amount.number}
                            {amount.unit}
                            {additional.map((str) => (
                              <>
                                <span> ({str})</span>
                              </>
                            ))}
                          </p>
                        </div>
                        <button
                          className="cursor-pointer dark:hover:text-[#f3a738] hover:text-white text-lg sm:text-xl"
                          onClick={() => {
                            updateQueryString(pathName, router, [
                              {
                                name: 'calories',
                                value: `${name}`,
                                type: 'add',
                              },
                              {
                                name: 'ingredient',
                                value: 'true',
                                type: 'delete',
                              },
                            ]);
                          }}
                        >
                          السعرات الحرارية
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </>
            </div>
          </>
        </section>
      ) : cal !== null ? (
        <section
          className="section xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1 shadow-[0_0_11px_4px_#f3a738] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3a738] 
        bg-[#f3a738]
        dark:bg-transparent
         lg:row-span-3 lg:col-span-4 
      lg:row-start-1 lg:col-start-1
      sm:row-span-3 sm:col-span-5 
      sm:row-start-1 sm:col-start-1
      row-span-2 col-span-1 
      row-start-3 col-start-1
      p-6 text-xl space-y-4
      overflow-hidden
      xl:max-h-[692px]
      
      lg:max-h-[610px]
      sm:max-h-[740px]
      max-h-[670px]
      
      "
        >
          <>
            <div className="flex flex-col h-full justify-center gap-4 items-center">
              <button
                className="dark:bg-[#f3a738] bg-white px-4 py-2 text-center text-sm sm:text-lg  cursor-pointer left-[40%] relative"
                onClick={() => {
                  router.back();
                }}
              >
                الرجوع
              </button>

              <article className="overflow-y-scroll w-[100%] mx-auto relative  h-3/4 max-h-[3/5] space-y-6">
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl text-center dark:text-[#f3a738] text-white font-bold">
                    {food ? food.name : ''} ({food?.amount.number}{' '}
                    {food?.amount.unit})
                  </h2>
                  {/* <Image
            width={200}
            height={200}
            src={food ? food.src : ''}
            alt={food ? food.name : ''}
          ></Image> */}
                </div>
                <ul className="space-y-4 text-2xl text-center ">
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      السعرات الحرارية : {food?.calory}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الدهون الكلية : {food?.totalFat.number}{' '}
                      {food?.totalFat.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكوليسترول : {food?.cholesterol.number}{' '}
                      {food?.cholesterol.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الصوديوم : {food?.sodium.number} {food?.sodium.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكربوهيدرات الكلية : {food?.totalCarbohydrates.number}{' '}
                      {food?.totalCarbohydrates.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      البروتين : {food?.protin.number} {food?.protin.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      فيتامين د : {food?.vitaminD.number} {food?.vitaminD.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكالسيوم : {food?.calcium.number} {food?.calcium.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الحديد : {food?.iron.number} {food?.iron.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      البوتاسيوم : {food?.potassium.number}{' '}
                      {food?.potassium.unit}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكافئيين : {food?.caffeine.number} {food?.caffeine.unit}
                    </h2>
                  </li>
                </ul>
              </article>
            </div>
          </>
        </section>
      ) : (
        <section
          className="section xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1 shadow-[0_0_11px_4px_#f3a738] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3a738] 
        bg-[#f3a738]
        dark:bg-transparent
         lg:row-span-3 lg:col-span-4 
      lg:row-start-1 lg:col-start-1
      sm:row-span-3 sm:col-span-5 
      sm:row-start-1 sm:col-start-1
      row-span-2 col-span-1 
      row-start-3 col-start-1
      p-6 text-xl space-y-4
      overflow-hidden
      xl:max-h-[692px]
      lg:max-h-[610px]
      sm:max-h-[740px]
      max-h-[670px]
      
      "
        >
          <>
            <div className="flex flex-col h-full justify-center gap-4 items-center p-2 w-[100%]">
              <div className="flex gap-2">
                <h2 className="text-xl sm:text-2xl dark:text-[#f3a738] text-white font-medium">
                  الوصفة /
                </h2>
                <h2
                  className="dark:hover:text-[#f3a738] hover:text-white cursor-pointer text-lg sm:text-xl"
                  onClick={() => {
                    updateQueryString(pathName, router, [
                      { name: 'ingredient', value: 'true', type: 'add' },
                    ]);
                  }}
                >
                  المكونات
                </h2>
              </div>
              <h2 className="text-xl sm:text-2xl  dark:text-[#f3a738] text-white font-bold">
                {itemsArray[parseInt(rec) - 1].title}
              </h2>
              <article className="space-y-2 overflow-y-scroll h-3/4 max-h-[3/5] relative">
                {itemsArray[parseInt(rec) - 1].steps.map((step, key) => (
                  <p
                    key={key}
                    className="text-lg sm:text-xl border border-t-0 border-r-0 border-l-0 p-2 border-b-gray-200 "
                  >
                    {step}
                  </p>
                ))}
              </article>
            </div>
          </>
        </section>
      )}
    </>
  );
}
