'use client';
import { updateQueryString } from '@/helpers/subNavigation';
import { usePathname, useRouter } from 'next/navigation';
import reviews from '../comments';
export default function Reviews() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <>
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
    </>
  );
}
