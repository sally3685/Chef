'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { updateQueryString } from '@/helpers/subNavigation';
import caloriesArray from '../calories';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { TimeForCooking, Ingredients } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getOneRecipy } from '@/data-access/recipies';
import Loading from '@/app/[typeId]/loading';
import { ImageIcon, Plus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { User } from '@prisma/client';
import ErrorPage from '@/app/[typeId]/error';
export default function Ingredient() {
  const { user, isLoaded } = useUser();
  const params = useSearchParams();
  const ingre = params.get('ingredient');
  const cal = params.get('calories');
  const router = useRouter();
  const caloies = params.get('calories');
  // const food = caloriesArray.find((e) => e.name === caloies);

  const pathName = usePathname();
  const { recipyId } = useParams();

  type reci = {
    author: User;
    title: string;
    slug: string;
    additional: string | null;
    src: string;
    steps: string[];
    service: number | null;
    decorePhoto: string;
    type: string;
    color: string;
    rate: number;
    classification: string;
    authorId: string;
    timeForCooking: TimeForCooking | null;
    ingredients: Ingredients[];
  };
  const [recipe, setRecipe] = useState<reci>();

  const slug = decodeURIComponent(recipyId as string);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');

  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const slug1 = decodeURIComponent(recipyId as string);
  //       const s = await getOneRecipy(slug1);
  //       setRecipe(s as reci);
  //     };

  //     fetchData();
  //   } catch (er) {}
  // }, []);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(false);
  useEffect(() => {
    // setItemsArray([]);
    const fetchData = async () => {
      setFetchLoad(true);
      const slug1 = decodeURIComponent(recipyId as string);
      const a = await getOneRecipy(slug1);
      if (a.status === 500) setError(a.message as string);
      else setRecipe(a.recipy as reci);
      setFetchLoad(false);
      // setItemsArray(a);
    };

    fetchData();
    setError(null);
  }, [refresh]);

  return (
    <>
      <section
        className="section xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1  border border-l-2 border-b-2 border-t-2 border-r-2 dark:shadow-[0_0_11px_4px_#f3a738] dark:border-[#f3a738] border-[#b25518] shadow-[0_0_11px_4px_#b25518] 
        bg-[#b25518]
        dark:bg-transparent
         lg:row-span-3 lg:col-span-3 
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
      
      xl:min-h-[692px]
      lg:min-h-[610px]
      sm:min-h-[740px]
      min-h-[670px]
      
      "
      >
        {' '}
        {ingre === 'true' ? (
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
              <h2 className="text-xl sm:text-2xl  dark:text-[#f3a738] text-white font-bold">
                {url}{' '}
                {error || isFetchLoad ? (
                  <></>
                ) : (
                  <>(الشيف : {recipe?.author.userName})</>
                )}
              </h2>

              {error ? (
                <>
                  <div
                    className="space-y-4 h-3/4 max-h-[3/4] overflow-y-scroll w-[100%]"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#f3a738 transparent',
                    }}
                  >
                    <ErrorPage
                      error={new Error(error)}
                      reset={() => {
                        setRefresh(!refresh);
                        router.refresh();
                      }}
                    ></ErrorPage>
                  </div>
                </>
              ) : !isFetchLoad &&
                recipe?.ingredients &&
                recipe?.ingredients?.length > 0 ? (
                <>
                  <div className="flex gap-2 justify-center my-4 items-center bg-[#f3a7384a] w-full p-2">
                    <h4 className="text-lg">
                      أهلا بك شيف{' '}
                      <span className="text-[#f3a738]  ">{user?.username}</span>{' '}
                      هل تريد إضافة/تعديل/حذف المزيد من المكونات
                    </h4>
                    <Link
                      href={`/${recipe?.classification}/update-ingredients/${recipe?.slug}`}
                    >
                      <Plus fontSize={20} color="#f3a738" fontWeight={700} />
                    </Link>
                  </div>
                  <ul
                    className="space-y-4 h-3/4 max-h-[3/4] overflow-y-scroll w-[100%]"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#f3a738 transparent',
                    }}
                  >
                    {recipe?.ingredients.map(
                      ({ name, src, amount, additional }, index) => (
                        <li
                          key={index}
                          className="flex-col sm:flex-row gap-[5px] flex justify-between items-center border border-t-0 border-r-0 border-l-0 border-b-gray-200 p-2"
                        >
                          <div className="flex gap-4 items-center ">
                            {src ? (
                              <Image
                                src={src}
                                alt={name}
                                width={100}
                                height={100}
                                unoptimized
                                className="w-[25%] sm:w-[100px]"
                              ></Image>
                            ) : (
                              <div className="w-[25%] sm:w-[100px]">
                                <ImageIcon />
                              </div>
                            )}
                            <p className="text-lg sm:text-xl ">
                              {name} : {amount.number} {amount.unit}{' '}
                              <>
                                <span key={index}>({additional})</span>
                              </>
                            </p>
                          </div>
                          <button
                            className="cursor-pointer dark:hover:text-[#f3a738] hover:text-white text-lg sm:text-xl"
                            onClick={() => {
                              updateQueryString(pathName, router, [
                                {
                                  name: 'calories',
                                  value: `${index}`,
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
              ) : !isFetchLoad && recipe ? (
                <div className="relative w-full h-full overflow-hidden flex justify-center flex-col items-center space-y-4">
                  {recipe.authorId === user?.id ? (
                    <>
                      <div className="flex gap-2 justify-center my-4 items-center bg-[#f3a7384a] w-full p-2">
                        <h4 className="text-lg">
                          أهلا بك شيف{' '}
                          <span className="text-[#f3a738]  ">
                            {user?.username}
                          </span>{' '}
                          هل تريد إضافة المزيد من المكونات
                        </h4>
                        <Link
                          href={`/${recipe?.classification}/update-ingredients/${recipe?.slug}`}
                        >
                          <Plus
                            fontSize={20}
                            color="#f3a738"
                            fontWeight={700}
                          />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <h1>لم يتم إضافة مكونات من الشيف بعد </h1>
                  )}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </>
        ) : cal !== null ? (
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
                    {recipe?.ingredients
                      ? recipe?.ingredients[parseInt(caloies as string)]?.name
                      : ''}{' '}
                    (
                    {
                      recipe?.ingredients[parseInt(caloies as string)]?.amount
                        .number
                    }{' '}
                    {
                      recipe?.ingredients[parseInt(caloies as string)]?.amount
                        .unit
                    }
                    )
                  </h2>
                  {recipe?.ingredients[parseInt(caloies as string)]?.src ? (
                    <Image
                      width={200}
                      height={200}
                      src={
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.src as string
                      }
                      unoptimized
                      alt={
                        recipe?.ingredients[parseInt(caloies as string)]?.name
                      }
                    ></Image>
                  ) : (
                    <ImageIcon />
                  )}
                  {/* */}
                </div>
                <ul className="space-y-4 text-2xl text-center ">
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      السعرات الحرارية :{' '}
                      {recipe?.ingredients[parseInt(caloies as string)]?.calory}
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الدهون الكلية :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.totalFat.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.totalFat.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكوليسترول :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.cholesterol.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.cholesterol.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الصوديوم :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]?.sodium
                          .number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]?.sodium
                          .unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكربوهيدرات الكلية :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.totalCarbohydrates.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.totalCarbohydrates.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      البروتين :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.protein.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.protein.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      فيتامين د :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.vitaminD.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.vitaminD.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكالسيوم :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.calcium.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.calcium.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الحديد :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]?.iron
                          .number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]?.iron
                          .unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      البوتاسيوم :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.potassium.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.potassium.unit
                      }
                    </h2>
                  </li>
                  <li className="p-2 border border-t-0 border-r-0 border-l-0 border-b-gray-200 ">
                    <h2 className="text-lg sm:text-xl">
                      الكافئيين :{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.caffeine.number
                      }{' '}
                      {
                        recipe?.ingredients[parseInt(caloies as string)]
                          ?.caffeine.unit
                      }
                    </h2>
                  </li>
                </ul>
              </article>
            </div>
          </>
        ) : (
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
                {url}{' '}
                {error || isFetchLoad ? (
                  <></>
                ) : (
                  <>(الشيف : {recipe?.author.userName})</>
                )}
              </h2>
              <article
                className={`space-y-2 ${
                  !error && !recipe ? 'overflow-hidden' : 'overflow-y-scroll'
                } h-3/4 max-h-[3/5] relative w-full`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#f3a738 transparent',
                }}
              >
                {error ? (
                  <>
                    <ErrorPage
                      error={new Error(error)}
                      reset={() => {
                        setRefresh(!refresh);
                        router.refresh();
                      }}
                    ></ErrorPage>
                  </>
                ) : !isFetchLoad && recipe ? (
                  <>
                    {recipe?.steps.map((step, key) => (
                      <p
                        key={key}
                        className="text-lg sm:text-xl border border-t-0 border-r-0 border-l-0 p-2 border-b-gray-200 "
                      >
                        {step}
                      </p>
                    ))}
                  </>
                ) : (
                  <Loading></Loading>
                )}
              </article>
            </div>
          </>
        )}
      </section>
    </>
  );
}
