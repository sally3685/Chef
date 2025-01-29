'use client';
import { Ingredients, TimeForCooking } from '@prisma/client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOneRecipy } from '@/data-access/recipies';
import { AlarmClock, Users, CookingPot } from 'lucide-react';
import Loading from '@/app/[typeId]/loading';
import { useRouter } from 'next/navigation';
import ErrorPage from '@/app/[typeId]/error';
export default function Information() {
  const params = useParams();
  const { recipyId } = params;

  type reci = {
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

  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(false);
  const router = useRouter();
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
  // Check if recipe exists to avoid accessing properties of undefined

  return (
    <div className="gap-4 flex-col p-6 h-full flex justify-center items-center">
      <h2 className="text-xl sm:text-2xl text-center dark:text-[#f3d34a] text-white font-bold">
        معلومات مهمة
      </h2>
      <div className={`space-y-4 w-[90%] p-2 ${recipe ? '' : 'h-[80%]'}`}>
        {!isFetchLoad && error ? (
          <ErrorPage
            error={new Error(error)}
            reset={() => {
              setRefresh(!refresh);
              router.refresh();
            }}
          ></ErrorPage>
        ) : !isFetchLoad && recipe ? (
          <>
            <div className="flex justify-between">
              <div className="flex justify-center gap-4">
                <AlarmClock color="#f3d34a" />
                <h3>وقت التحضير </h3>
              </div>
              <h3>
                {recipe?.timeForCooking?.time} {recipe.timeForCooking?.unit}
              </h3>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center gap-4">
                <Users color="#f3d34a" />
                <h3>يكفي ل</h3>
              </div>
              <h3>{recipe.service} أشخاص </h3>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center gap-4">
                <CookingPot color="#f3d34a" />
                <h3> نوع الطبق </h3>
              </div>
              <h3>{recipe.type}</h3>
            </div>
          </>
        ) : (
          <div className="h-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
