'use client';
import React, { useEffect, useState } from 'react';
import {
  deleteRecipe,
  deleteUTFiles,
  getOneRecipy,
} from '@/data-access/recipies';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import ErrorPage from '@/app/[typeId]/error';
export default function Page() {
  const params = useParams();
  const router = useRouter();

  let slug = decodeURIComponent(params.slug as string);
  let sent = slug;
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(false);
  const handleDelete = async () => {
    setFetchLoad(true);
    const previus = await getOneRecipy(sent);
    if (previus.status === 500) {
      setError(previus.message as string);
    } else {
      const url = previus?.recipy?.src.split('/').pop();

      const res = await deleteUTFiles(url as string);

      if (res.status === 500) {
        setError(res.message as string);
      } else {
        const res1 = await deleteRecipe(sent, params.typeId as string);

        if (res1.status === 500) {
          setError(res1.message as string);
        } else {
          setFetchLoad(false);
          alert('تم حذف الوصفة');
          router.back();
        }
      }
    }
  };

  slug = slug.replaceAll('-', ' ');
  slug = slug.replace(/[0-9]/g, '');

  return (
    <div className="bg-[#151517] bg-opacity-75 flex justify-evenly items-center w-full h-full fixed top-0 z-[4] ">
      <div className="dark:bg-[#151517] bg-[#f5f5f4] shadow-[0_0_11px_4px_#eea243] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#eea243] lg:w-1/2 h-1/2 w-3/4 max-h-[400px] flex gap-[2rem] justify-center items-center flex-col relative">
        <button
          onClick={() => {
            router.back();
            router.refresh();
          }}
          className=" w-[24px] h-[24px] text-[20px] rounded text-[#eea243] right-[5px] top-[5px] absolute "
        >
          &#10008;
        </button>
        {!isFetchLoad && error ? (
          <ErrorPage
            error={new Error(error)}
            reset={() => {
              setFetchLoad(false);
              setError(null);
              router.refresh();
            }}
          ></ErrorPage>
        ) : (
          <>
            <h1 className="text-xl">
              هل تريد حذف وصفتك{' '}
              <span className="text-[#eea243] font-bold">{slug}</span>{' '}
            </h1>
            {isFetchLoad && (
              <p
                aria-label="h1"
                className="text-xl my-1 font-bold w-full text-center  text-[#f3a738]"
              >
                يتم معالجة الطلب الرجاء الانتظار 🥰 ...
              </p>
            )}
            <button
              onClick={() => {
                handleDelete();
              }}
              disabled={isFetchLoad}
              className={`${
                isFetchLoad
                  ? 'bg-[#88888a] cursor-not-allowed'
                  : 'bg-[#eea243] cursor-pointer'
              } p-1 w-1/4 rounded text-[#151517]`}
            >
              حذف
            </button>
          </>
        )}
      </div>
    </div>
  );
}
