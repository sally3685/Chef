'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { updateQueryString } from '@/helpers/subNavigation';
export default function WriteReview() {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <>
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
    </>
  );
}
