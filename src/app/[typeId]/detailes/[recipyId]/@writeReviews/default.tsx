'use client';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { updateQueryString } from '@/helpers/subNavigation';
import { useSearchParams } from 'next/navigation';
import reviews from '../comments';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Comment, Ingredients, TimeForCooking, User } from '@prisma/client';
import {
  deleteComment,
  GetComments,
  postComment,
} from '@/data-access/comments';
import Loading from '@/app/[typeId]/loading';
import { getOneRecipy } from '@/data-access/recipies';
import ErrorPage from '@/app/[typeId]/error';
export default function WriteReview() {
  const { user, isLoaded } = useUser();
  const pathName = usePathname();
  const router = useRouter();
  const [reviews, setReviews] = useState<ss[]>();
  const [sub, setSub] = useState(false);
  const [subdel, setSubdel] = useState(false);
  const [fa, setFa] = useState(false);
  //طعم لذيذ ومذهل، لم أتذوق مثله من قبل!

  type ss = {
    user: User;
    id: string;
    rating: number;
    recipeId: string;
    userId: string;
    customId: string;
    comments: {
      text: string;
      date: Date;
    }[];
  };
  const [recipe, setRecipe] = useState<reci>();

  const param: any = useSearchParams();
  const write = param.get('writeReview');
  const [comment, setComment] = useState('');

  const { recipyId } = useParams();

  type reci = {
    id: string;
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

  const slug = decodeURIComponent(recipyId as string);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(true);
  useEffect(() => {
    // setItemsArray([]);

    const fetchData = async () => {
      setFetchLoad(true);
      const slug1 = decodeURIComponent(recipyId as string);
      const a = await getOneRecipy(slug1);

      if (a.status === 500) {
        setError(a.message as string);
      } else {
        const s = await GetComments();
        if (s.status === 200) {
          setRecipe(a.recipy as reci);
          setReviews(s.reviews as ss[] | undefined);
        } else {
          setError(s.message as string);
        }
      }
      setFetchLoad(false);
      // setItemsArray(a);
    };
    fetchData();
    setError(null);
  }, [refresh]);

  const deletecomment = async (id: number) => {
    setFetchLoad(true);
    const res = await deleteComment(
      user?.id as string,
      recipe?.id as string,
      id
    );
    if (res.status === 500) setError(res.message as string);
    else setRefresh(!refresh);
    setFetchLoad(false);
  };
  return (
    <>
      <section
        className="section xl:row-span-2 xl:col-span-3  border border-l-2 border-b-2 border-t-2 border-r-2 
        xl:row-start-4 xl:col-start-3
        dark:bg-transparent
        dark:border-[#eea243]
         
        bg-[#ce8538] border-[#ce8538] shadow-[0_0_11px_4px_#ce8538] dark:shadow-[0_0_11px_4px_#eea243]
        
        lg:row-span-2 lg:col-span-4 
        lg:row-start-4 lg:col-start-2
        
        sm:row-span-2 sm:col-span-5 
        sm:row-start-6 sm:col-start-1
        
        row-span-1 col-span-1 
        row-start-6 col-start-1
        overflow-hidden
            xl:max-h-[446px]
            xl:min-h-[446px]
        lg:max-h-[435px]
        lg:min-h-[435px]
        sm:max-h-[590px]
        max-h-[450px]
        sm:min-h-[590px]
        min-h-[450px]
        "
      >
        {write === 'true' ? (
          <div className="flex flex-col justify-center items-center gap-4 h-full relative w-[100%] p-2">
            <h2 className="text-xl sm:text-2xl text-center text-[#eea243] font-bold">
              شاركنا رأيك😊
            </h2>
            {sub ? (
              <p className="text-center text-[#eea243] font-bold w-full">
                ...يتم معالجة الطلب الرجاء الانتظار
              </p>
            ) : (
              <></>
            )}
            {!isFetchLoad && error ? (
              <>
                <div
                  className="overflow-y-scroll max-h-[50%]"
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
            ) : !isFetchLoad && recipe && isLoaded && user ? (
              <>
                <textarea
                  className="w-[80%] sm:w-[60%] h-[30%] p-2 text-black bg-white rounded "
                  placeholder="اكتب تعليقا"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>

                <button
                  disabled={sub}
                  className={`w-1/2 m-0 rounded p-2 focus:outline-orange-500 focus:outline-2 outline-none  
                  ${
                    sub == true
                      ? 'bg-stone-400 cursor-not-allowed'
                      : 'bg-[#eea243] cursor-pointer'
                  }
              '`}
                  onClick={async () => {
                    setSub(true);
                    const y = await postComment(
                      user?.id as string,
                      user.username as string,
                      recipe?.id as string,
                      comment
                    );
                    if (y.status === 500) setError(y.message as string);
                    else setRefresh(!refresh);
                    setSub(false);
                    setComment('');
                    updateQueryString(pathName, router, [
                      { name: 'writeReview', value: 'true', type: 'delete' },
                    ]);
                  }}
                >
                  إرسال
                </button>
              </>
            ) : isLoaded && !user ? (
              <p className="text-lg sm:text-xl border border-t-0 border-r-0 border-l-0 p-2 border-b-gray-200">
                لا يمكن اضافة تعليق دون تسجيل دخولك للموقع 😔
              </p>
            ) : (
              <>
                <Loading></Loading>
              </>
            )}

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
        ) : (
          <div className="relative h-full">
            <div className="flex flex-col justify-center items-center gap-4 h-full">
              <h2 className="text-xl sm:text-2xl text-center dark:text-[#eea243] text-white font-bold">
                تعليقات المستخدمين
              </h2>
              {subdel ? (
                <p className="text-center text-[#eea243] font-bold w-full">
                  ...يتم معالجة الطلب الرجاء الانتظار
                </p>
              ) : (
                <></>
              )}
              <div
                className="space-y-4 h-[50%] overflow-y-scroll  w-[90%]  p-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#f3a738 transparent',
                }}
              >
                {!isFetchLoad && error ? (
                  <>
                    <ErrorPage
                      error={new Error(error)}
                      reset={() => {
                        setRefresh(!refresh);
                        router.refresh();
                      }}
                    ></ErrorPage>
                  </>
                ) : !isFetchLoad && reviews && reviews.length > 0 ? (
                  reviews.map(
                    (review) =>
                      review.comments &&
                      review.comments.length > 0 &&
                      review.comments?.map((comment, id) => (
                        <div key={id}>
                          <div className="flex-col sm:flex-row gap-[5px] flex sm:gap-2 items-center  border border-t-0 border-r-0 border-l-0 p-2">
                            <div className="flex justify-center items-center gap-[5px]">
                              {user?.id === review.user.clerkId ? (
                                <span
                                  style={
                                    subdel
                                      ? { display: 'none' }
                                      : { display: 'inline-block' }
                                  }
                                  className="cursor-pointer"
                                  onClick={() => {
                                    deletecomment(id);
                                  }}
                                >
                                  <Trash2 className="w-[20px] sm:w-[40px]"></Trash2>
                                </span>
                              ) : (
                                <></>
                              )}
                              <p className=" border-b-gray-200 text-lg sm:text-xl w-[60%]">
                                {comment.text}
                              </p>
                            </div>
                            <span className="relative flex justify-end text-sm text-stone-400 w-[40%]">
                              {review.user.userName}{' '}
                              {comment.date.toLocaleDateString('en-GB')}
                            </span>
                          </div>
                        </div>
                      ))
                  )
                ) : !isFetchLoad && (!reviews || reviews.length === 0) ? (
                  <p className="text-lg sm:text-xl border border-t-0 border-r-0 border-l-0 p-2 border-b-gray-200">
                    لا يوجد تعليقات بعد 😔
                  </p>
                ) : (
                  <Loading></Loading>
                )}
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
        )}
      </section>
    </>
  );
}
