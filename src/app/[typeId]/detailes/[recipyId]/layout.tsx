'use client';
import { useAnimation } from '@/helpers/useAnimation';
import { ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
export default function Detaileslayout({
  ingredients,
  writeReviews,
  information,
  rating,
  foodImage,
}: {
  information: ReactNode;
  rating: ReactNode;
  ingredients: React.ReactNode;
  writeReviews: React.ReactNode;
  foodImage: React.ReactNode;
}) {
  useAnimation(() => {
    if (document) {
      const sec = document.querySelectorAll('.section');
      let ctx = gsap.context(() => {
        // gsap.defaults({ ease: 'ease.in' });
        const animateSections = () => {
          gsap.defaults({ ease: 'power1.out' });
          gsap.fromTo(
            sec,
            {
              scale: 0,
            },
            {
              scale: 1,
              ease: 'power1.out',
              stagger: {
                amount: 0.5,
                grid: 'auto',
                from: 'start',
              },
            }
          );
        };

        // Initial animation on page load
        animateSections();

        // Add event listener for window resize
        window.addEventListener('resize', () => {
          // Reset the scale to 0 before animating again
          gsap.set(sec, { scale: 0 });
          animateSections();
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <main
        className="contain max-w-7xl p-2 w-full mb-12 mx-6 md:mx-12 3xl:mx-auto grid 
      xl:grid-cols-[1fr_1fr_1fr_1fr_1fr]
       xl:grid-rows-[0.2fr_0.5fr_0.5fr_0.2fr_0.6fr]
    lg:grid-rows-[0.2fr_0.1fr_0.5fr_0.1fr_0.6fr]
    lg:grid-cols-[2.5fr_2fr_1fr_1fr_2fr]
    sm:grid-rows-[2fr_0.5fr_0.5fr_0.5fr_2fr_2fr_0.5fr]
    sm:grid-cols-[1fr_3fr_1fr_1fr_1fr]
    grid-rows-[4fr_1fr_6fr_1fr_3fr_5fr]
    grid-cols-1
    min-h-screen max-h-[2100px] gap-10
    
    "
      >
        {ingredients}

        {writeReviews}
        <section
          className="section 
        xl:row-span-2 xl:col-span-2 shadow-[0_0_11px_4px_#d3b577] border-[#d3b577] dark:shadow-[0_0_11px_4px_#f3d34a] border border-l-2 border-b-2 border-t-2 border-r-2 dark:border-[#f3d34a]
        xl:row-start-4 xl:col-start-1
        
        lg:row-span-2 lg:col-span-1 
        lg:row-start-4 lg:col-start-1
        sm:row-span-2 sm:col-span-3 
        sm:row-start-4 sm:col-start-3
        row-span-1 col-span-1 
        row-start-5 col-start-1
        overflow-hidden
            xl:max-h-[446px]
            xl:min-h-[446px]
        lg:max-h-[435px]
        lg:min-h-[435px]
        sm:max-h-[590px]
        sm:min-h-[590px]
        max-h-[270px]
        min-h-[270px]
        dark:bg-transparent
        bg-[#d3b577]

        "
        >
          {information}
        </section>
        <section
          className="section 
        xl:row-span-1 xl:col-span-2  
        xl:row-start-1 xl:col-start-4
        
        lg:row-span-1 lg:col-span-2 
        lg:row-start-1 lg:col-start-4
        
        sm:row-span-1 sm:col-span-2 
        sm:row-start-4 sm:col-start-1
        
        row-span-1 col-span-1 
        row-start-2 col-start-1
        overflow-visible
        
        max-h-[80px]
        min-h-[80px]
        "
        >
          {rating}
        </section>
        <section
          className="section  xl:row-span-2 xl:col-span-2 
        xl:row-start-2 xl:col-start-4
        lg:row-span-4 lg:col-span-2 
        lg:row-start-2 lg:col-start-4   
        sm:row-span-1 sm:col-span-2 
        sm:row-start-5 sm:col-start-1
        row-span-1 col-span-1 
        row-start-1 col-start-1
        overflow-visible
        xl:max-h-[548px]
       
        lg:max-h-[412px]
        lg:min-h-[412px]
        sm:max-h-[440px]
        max-h-[358px]
         xl:min-h-[548px]
        sm:min-h-[440px]
        min-h-[358px]
        "
        >
          {foodImage}
        </section>
      </main>
    </>
  );
}
// {children}
