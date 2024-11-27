'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { updateQueryString } from '@/helpers/subNavigation';
import { useSearchParams } from 'next/navigation';
import reviews from '../comments';
export default function WriteReview() {
  const pathName = usePathname();
  const router = useRouter();

  const param: any = useSearchParams();
  const ingre = param.get('ingredient');
  const write = param.get('writeReview');
  const cal = param.get('calories');
  return (
    <>
      {write === 'true' ? (
        <section
          className="section xl:row-span-2 xl:col-span-3 shadow-[0_0_11px_4px_#eea243] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#eea243]
        xl:row-start-4 xl:col-start-3
        dark:bg-transparent
        bg-[#eea243]
        lg:row-span-2 lg:col-span-4 
        lg:row-start-4 lg:col-start-2
        
        sm:row-span-2 sm:col-span-5 
        sm:row-start-6 sm:col-start-1
        
        row-span-1 col-span-1 
        row-start-6 col-start-1
        overflow-hidden
           xl:max-h-[446px]
        lg:max-h-[657px]
        sm:max-h-[590px]
        max-h-[450px]
        "
        >
          <div className="flex flex-col justify-center items-center gap-4 h-full relative w-[100%] p-2">
            <h2 className="text-xl sm:text-2xl text-center text-[#eea243] font-bold">
              شاركنا رأيك😊
            </h2>
            <textarea
              className="w-[60%] h-[30%] p-2 text-black"
              placeholder="اكتب تعليقا"
            ></textarea>
            <button className="dark:hover:text-[#eea243] hover:text-white">
              إرسال
            </button>
            <button
              className="border border-solid border-x-8 border-y-8 border-b-0 border-l-0 border-white dark:border-[#eea243] p-4 w-[60%] absolute bottom-0 left-0"
              onClick={() => {
                updateQueryString(pathName, router, [
                  { name: 'writeReview', value: 'true', type: 'delete' },
                ]);
              }}
            >
              العودة إلى تعليقات المستخدمين
            </button>
          </div>
        </section>
      ) : (
        <section
          className="section xl:row-span-2 xl:col-span-3 shadow-[0_0_11px_4px_#eea243] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#eea243]
        xl:row-start-4 xl:col-start-3
        dark:bg-transparent
        bg-[#eea243]
        
        lg:row-span-2 lg:col-span-4 
        lg:row-start-4 lg:col-start-2
        
        sm:row-span-2 sm:col-span-5 
        sm:row-start-6 sm:col-start-1
        
        row-span-1 col-span-1 
        row-start-6 col-start-1
        overflow-hidden
            xl:max-h-[446px]
        lg:max-h-[657px]
        sm:max-h-[590px]
        max-h-[450px]
        "
        >
          <div className="relative h-full">
            <div className="flex flex-col justify-center items-center gap-4 h-full">
              <h2 className="text-xl sm:text-2xl text-center dark:text-[#eea243] text-white font-bold">
                تعليقات المستخدمين
              </h2>
              <div className="space-y-4 h-[50%] overflow-y-scroll  w-[90%]  p-2">
                {reviews.map((review, id) => (
                  <p
                    key={id}
                    className="text-lg sm:text-xl border border-t-0 border-r-0 border-l-0 p-2 border-b-gray-200"
                  >
                    {review.text}
                  </p>
                ))}
              </div>
            </div>{' '}
            <button
              className="border border-solid border-x-8 border-y-8 border-b-0 border-l-0  dark:border-[#eea243] border-white p-4 w-[40%] absolute bottom-0 left-0"
              onClick={() =>
                updateQueryString(pathName, router, [
                  { name: 'writeReview', value: 'true', type: 'add' },
                ])
              }
            >
              كتابة تعليق
            </button>
          </div>
        </section>
      )}
    </>
  );
}
