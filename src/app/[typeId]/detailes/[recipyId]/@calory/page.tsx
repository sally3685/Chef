'use client';
import { Metadata } from 'next';
import caloriesArray from '../calories';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function Calories() {
  const params: any = useSearchParams();
  const router = useRouter();
  const caloies = params.get('calories');
  const food = caloriesArray.find((e) => e.name === caloies);
  return (
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
              {food ? food.name : ''} ({food?.amount.number} {food?.amount.unit}
              )
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
                الدهون الكلية : {food?.totalFat.number} {food?.totalFat.unit}
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
                البوتاسيوم : {food?.potassium.number} {food?.potassium.unit}
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
  );
}
