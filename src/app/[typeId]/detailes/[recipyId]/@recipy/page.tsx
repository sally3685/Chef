'use client';
import { updateQueryString } from '@/helpers/subNavigation';
import { usePathname, useRouter } from 'next/navigation';
import itemsArray from '../items';
type Props = {
  params: {
    recipyId: string;
  };
};
export default async function Recipy({ params }: Props) {
  const { recipyId } = await params;
  const pathName = usePathname();
  const router = useRouter();
  return (
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
          {itemsArray[parseInt(recipyId) - 1].title}
        </h2>
        <article className="space-y-2 overflow-y-scroll h-3/4 max-h-[3/5] relative">
          {itemsArray[parseInt(recipyId) - 1].steps.map((step, key) => (
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
  );
}
