'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { updateQueryString } from '@/helpers/subNavigation';
import caloriesArray from '../calories';
import Image from 'next/image';
import itemsArray from '../items';
type Props = {
  params: {
    typeId: string;
    recipyId: string;
  };
};

export default async function Ingredients({ params }: Props) {
  const { typeId, recipyId } = await params;
  const pathName = usePathname();
  const router = useRouter();
  return (
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
            {itemsArray[parseInt(recipyId) - 1].title}
          </h2>

          <ul className="space-y-4 h-3/4 max-h-[3/4] overflow-y-scroll w-[100%]">
            {caloriesArray.map(({ name, src, amount, additional, id }) => (
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
                      { name: 'calories', value: `${name}`, type: 'add' },
                      { name: 'ingredient', value: 'true', type: 'delete' },
                    ]);
                  }}
                >
                  السعرات الحرارية
                </button>
              </li>
            ))}
          </ul>
        </>
      </div>
    </>
  );
}
