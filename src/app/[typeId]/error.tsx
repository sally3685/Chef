'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative mx-auto p-4 w-full  max-w-7xl   flex flex-col justify-center items-center h-[236px] gap-10">
      <section>
        <div
          style={{ backgroundSize: '100%' }}
          className="bg-[url(/tomato.svg)] bg-center bg-no-repeat w-[100px] h-[100px] relative sm:scale-100 scale-75"
        >
          <div
            style={{ backgroundSize: '100%' }}
            className="bg-[url(/sad.svg)] bg-center bg-no-repeat w-[70px] h-[70px] absolute top-[37px] left-[10px]"
          ></div>
        </div>
      </section>
      <section className="sm:text-lg md:text-xl text-sm flex flex-col justify-center items-center  gap-10 ">
        <h1>{error.message}</h1>
        <button
          className="w-3/4 m-auto rounded-xl sm:p-2 p-1 bg-[#d3b577] text-black focus:outline-2 outline-none cursor-pointer "
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          حاول مجددا
        </button>
      </section>
    </main>
  );
}
