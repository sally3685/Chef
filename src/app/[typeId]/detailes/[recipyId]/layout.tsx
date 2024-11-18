'use client';
import { isValidElement, ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Card from '../../_component/Card';
import Image from 'next/image';
import itemsArray from './items';
type Props = {
  typeId: string;
  recipyId: string;
};
export default function Detaileslayout({
  children,
  ingredients,
  reviews,
  writeReviews,
  recipy,
  information,
  rating,
  calory,
  params,
}: {
  information: ReactNode;
  rating: ReactNode;
  children: React.ReactNode;
  ingredients: React.ReactNode;
  reviews: React.ReactNode;
  writeReviews: React.ReactNode;
  recipy: React.ReactNode;
  calory: React.ReactNode;
  params: Props;
}) {
  // const {recipyId}=await params;
  const param: any = useSearchParams();
  const ingre = param.get('ingredient');
  const write = param.get('writeReview');
  const cal = param.get('calories');

  return (
    <main
      className="max-w-8xl my-12 mx-6 md:mx-12 3xl:mx-auto grid 
      xl:grid-cols-[1fr_1fr_1fr_1fr_1fr]
       xl:grid-rows-[0.2fr_0.5fr_0.5fr_0.2fr_0.6fr] 
    lg:grid-rows-[0.2fr_0.1fr_0.5fr_0.1fr_0.6fr]
    lg:grid-cols-[2.5fr_2fr_1fr_1fr_2fr]
    sm:grid-rows-[2fr_0.5fr_0.5fr_0.5fr_2fr_2fr_0.5fr]
    sm:grid-cols-[1fr_3fr_1fr_1fr_1fr]
    grid-rows-[4fr_1fr_6fr_1fr_3fr_5fr]
    grid-cols-1
    min-h-screen max-h-[2000px] gap-10
    
    "
    >
      {ingre === 'true' ? (
        <section
          className="xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1 shadow-[0_0_11px_4px_#f3a738] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3a738] 
          dark:bg-transparent
          bg-[#f3a738]
           lg:row-span-3 lg:col-span-4 
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
        "
        >
          {ingredients}
        </section>
      ) : cal !== null ? (
        <section
          className="xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1 shadow-[0_0_11px_4px_#f3a738] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3a738] 
          bg-[#f3a738]
          dark:bg-transparent
           lg:row-span-3 lg:col-span-4 
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
        
        "
        >
          {calory}
        </section>
      ) : (
        <section
          className="xl:row-span-3 xl:col-span-3 xl:row-start-1 xl:col-start-1 shadow-[0_0_11px_4px_#f3a738] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3a738] 
          bg-[#f3a738]
          dark:bg-transparent
           lg:row-span-3 lg:col-span-4 
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
        
        "
        >
          {recipy}
        </section>
      )}

      {write === 'true' ? (
        <section
          className="xl:row-span-2 xl:col-span-3 shadow-[0_0_11px_4px_#eea243] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#eea243]
        xl:row-start-4 xl:col-start-3
        dark:bg-transparent
        bg-[#eea243]
        lg:row-span-1 lg:col-span-4 
        lg:row-start-5 lg:col-start-2
        
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
          {writeReviews}
        </section>
      ) : (
        <section
          className=" xl:row-span-2 xl:col-span-3 shadow-[0_0_11px_4px_#eea243] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#eea243]
        xl:row-start-4 xl:col-start-3
        dark:bg-transparent
        bg-[#eea243]
        
        lg:row-span-1 lg:col-span-4 
        lg:row-start-5 lg:col-start-2
        
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
          {reviews}
        </section>
      )}
      <section
        className="
        xl:row-span-2 xl:col-span-2 shadow-[0_0_11px_4px_#f3d34a] border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3d34a]
        xl:row-start-4 xl:col-start-1
        
        lg:row-span-2 lg:col-span-1 
        lg:row-start-4 lg:col-start-1
        sm:row-span-2 sm:col-span-3 
        sm:row-start-4 sm:col-start-3
        row-span-1 col-span-1 
        row-start-5 col-start-1
        overflow-hidden
            xl:max-h-[446px]
        lg:max-h-[657px]
        sm:max-h-[590px]
        max-h-[270px]
        dark:bg-transparent
        bg-[#f3d34a]

        "
      >
        {information}
      </section>
      <section
        className="
        xl:row-span-1 xl:col-span-2  
        xl:row-start-1 xl:col-start-4
        
        lg:row-span-1 lg:col-span-3 
        lg:row-start-4 lg:col-start-2
        
        sm:row-span-1 sm:col-span-2 
        sm:row-start-4 sm:col-start-1
        
        row-span-1 col-span-1 
        row-start-2 col-start-1
        overflow-hidden
        
        "
      >
        {rating}
      </section>
      <section
        className=" border border-l-2 border-b-2 border-t-2 border-r-2 border-[#f3e37c]
        xl:row-span-2 xl:col-span-2 
        xl:row-start-2 xl:col-start-4
        lg:row-span-4 lg:col-span-1 
        lg:row-start-1 lg:col-start-5
        
        sm:row-span-1 sm:col-span-2 
        sm:row-start-5 sm:col-start-1
        shadow-[0_0_11px_4px_#f3e37c]
        row-span-1 col-span-1 
        row-start-1 col-start-1
        overflow-hidden
        xl:max-h-[548px]
        lg:max-h-[610px]
        sm:max-h-[440px]
        max-h-[496px]
        "
      >
        <Image
          src={itemsArray[parseInt(params.recipyId) - 1].src}
          alt={itemsArray[parseInt(params.recipyId) - 1].title}
          className="w-full h-full "
        ></Image>
      </section>
    </main>
  );
}
// {children}
