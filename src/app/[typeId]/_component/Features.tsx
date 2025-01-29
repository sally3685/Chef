'use client';
import React, { useLayoutEffect, useRef } from 'react';
import carrot from '@/app/assets/images/general/carrot13.png'; //4
import knife from '@/app/assets/images/general/knife.svg';
// import soup from '@/app/assets/images/general/soup.svg';
// import plate from '@/app/assets/images/general/plate.svg';
import wood from '@/app/assets/images/general/wood.svg';
import smoke from '@/app/assets/images/general/smoke.png';
import styles from '@/app/assets/css/features.module.css';
import Image from 'next/image';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
const Features = () => {
  const fireArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ duration: 1 });
      const tl1 = gsap.timeline();
      // gsap.set('.carrotPiece', {
      //   opacity: 1, //scale(0.45) rotateY(27deg) translateX(-25px) translateY(-53px)
      //   transform: 'translateX(255%) rotateY(23deg) ',
      // });
      const tl3 = gsap.timeline();
      tl3.to('.highliter', {
        backgroundSize: '100% 100%',
        ease: 'back.in',
        duration: 3,
      });
      const anim = () => {
        gsap.set('.text', {
          opacity: 0,
        });
        gsap.set('#wood', {
          opacity: 0,
        });
        gsap.set('#fireContainer', {
          opacity: 0,
        });
        gsap.set('.carrotPiece', {
          opacity: 0,
        });
        tl1.pause();
      };
      const anim1 = () => {
        gsap.set('.text', {
          opacity: 1,
        });
        gsap.set('#wood', {
          opacity: 1,
        });
        gsap.set('#fireContainer', {
          opacity: 1,
        });
        gsap.set('.carrotPiece', {
          opacity: 1,
        });
        tl1.play();
      };
      tl1.repeat(-1);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.containerRef',
          start: '110% bottom',
          end: '+=250px',
          pin: true,
          scrub: true,
          onEnter: () => anim(),
        },
      });
      let mm = gsap.matchMedia();
      /*
  .to('.plateContainer', {
          left: '10%',
          onReverseComplete: () => anim1(),
        })
  */
      mm.add('(min-width:1024px)', () => {
        tl.to('.plateContainer', {
          translateX: '50%',
          onReverseComplete: () => anim1(),
        }).to(
          '.hiddenBox',
          {
            scale: 1,
            onReverseComplete: () => anim1(),
          },
          '<'
        );
      });

      mm.add('(max-width:1023px)', () => {
        tl.to(
          '.hiddenBox',
          {
            scale: 1,
            onReverseComplete: () => anim1(),
          },
          '<'
        );
      });

      const createAnimation = () => {
        const tl = gsap.timeline();
        tl.to('#soup', {
          rotate: '4deg',
        })
          .to('#soup', {
            rotate: '-4deg',
          })
          .to('#soup', {
            rotate: '0deg',
          });
        return tl;
      };

      const resetAnimation = () => {
        const animation = createAnimation();
        return animation;
      };

      ScrollTrigger.create({
        trigger: '.containerRef',
        start: '50% bottom',
        end: '+=100%',
        onEnter: () => {
          resetAnimation();
        },
        onEnterBack: () => {
          resetAnimation();
        },
      });
    });
    return () => ctx.revert();
  });

  return (
    <div className="flex flex-col ">
      <div
        className={`w-full max-w-6xl mx-auto p-6 relative section
        mt-12 flex flex-wrap justify-center items-center h-[85vh] `}
      >
        <div
          className={`flex flex-col items-center justify-center relative ${styles.mediaContainer}`}
        >
          <h2 className="text-[#e9a951] font-bold text-3xl mb-6 text-right right-0 w-full ">
            افضل الوصفات
          </h2>
          <p
            style={{ lineHeight: '2' }}
            className=" sm:text-2xl text-xl textup1 inline-block overflow-hidden dark:text-[#ffffffe7] text-[#111111]"
          >
            مجموعة متنوعة من{' '}
            <span
              className="relative bg-gradient-to-l dark:from-[#e9a951] dark:to-[#e9a951] 
                from-[#e9a951] to-[#e9a951]
                bg-no-repeat bg-[length:0%_100%]  bg-[right]  highliter"
            >
              وصفات الطعام بتفاصيل شاملة
            </span>{' '}
            ، تتضمن قائمة العناصر والسعرات الحرارية. يساعدك على اكتشاف وتجربة
            وصفات جديدة وشهية لتحضير وجبات لذيذة في منزلك.
          </p>
        </div>
        <div
          className={` flex items-center justify-center relative ${styles.mediaImage}`}
        >
          <div
            className={`${styles.carrot} relative bg-[url(/carrot13.png)] bg-center bg-no-repeat`}
          >
            <Image
              src={knife}
              alt="knife"
              height={100}
              width={200}
              id="knife"
              className={styles.knife}
            />
            <div className={`carrotPiece ${styles.carrotPiece}`}>
              <div className={styles.back}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={styles.middle}></div>
              <div className={`${styles.middle} ${styles.wid}`}></div>
              <div className={`${styles.middle} ${styles.hig}`}></div>

              <div className={styles.front}></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="max-w-6xl w-full mx-auto p-6 relative section
        mt-12 flex flex-wrap justify-center items-center h-[85vh] containerRef"
      >
        <div
          className={`text flex flex-col items-center justify-center relative ${styles.mediaContainer}`}
        >
          <h2 className="text-[#e9a951] font-bold text-3xl mb-6 text-right right-0 w-full ">
            افضل الوصفات
          </h2>
          <p
            style={{ lineHeight: '2' }}
            className=" sm:text-2xl text-xl textup1 inline-block overflow-hidden dark:text-[#ffffffe7] text-[#111111]"
          >
            هل جربت وصفة مميزة؟{' '}
            <span
              className="relative bg-gradient-to-l dark:from-[#e9a951] dark:to-[#e9a951] 
                from-[#e9a951] to-[#e9a951]
                bg-no-repeat bg-[length:0%_100%]  bg-[right]  highliter"
            >
              شارك تجربتك وأطرح تعليقك
            </span>{' '}
            حول الطعم والتحضير. شارك رأيك حول الوصفات والمكونات مع الآخرين
            لتحسين تجربة الطهي.
          </p>
        </div>
        <div className={` flex items-center justify-center relative `}>
          <div
            className={`plateContainer  flex items-center justify-center relative ${styles.mediaPlateContainer}`}
          >
            <div
              className={`w-[80%] h-[62%] top-[-5%] relative bg-[url(/plate.svg)] bg-no-repeat ${styles.platee}`}
            ></div>
            <div
              id="soup"
              className={`bg-[url(/soup.svg)] bg-no-repeat ${styles.soup}`}
            ></div>
            <div
              className={`flex gap-1 absolute ${styles.fireContainer}`}
              id="fireContainer"
            >
              {fireArray.map((f, index) => (
                <div className={`${styles.mo_fire}`} key={index}>
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="125px"
                    height="189.864px"
                    viewBox="0 0 125 189.864"
                    enableBackground="new 0 0 125 189.864"
                    xmlSpace="preserve"
                  >
                    <path
                      className={`${styles.flame_main}`}
                      fill="#F36E21"
                      d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465
	c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54
	c6.806,41.899,16.831,45.301,6.088,53.985"
                    />
                    <path
                      className={`${styles.flame_main} ${styles.one}`}
                      fill="#F6891F"
                      d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123
	c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"
                    />
                    <path
                      className={`${styles.flame_main} ${styles.two}`}
                      fill="#FFD04A"
                      d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998
	C84.858,184.21,125.705,150.905,81.657,79.192z"
                    />
                    <path
                      className={`${styles.flame_main} ${styles.three}`}
                      fill="#FDBA16"
                      d="M99.92,101.754c0,0-23.208,47.027-12.043,80.072c0,0,32.741-16.073,20.108-45.79
	C95.354,106.319,99.92,114.108,99.92,101.754z"
                    />
                    <path
                      className={`${styles.flame_main} ${styles.four}`}
                      fill="#F36E21"
                      d="M103.143,105.917c0,0,8.927,30.753-1.043,46.868c-9.969,16.115-14.799,29.041-14.799,29.041
	S134.387,164.603,103.143,105.917z"
                    />
                    <path
                      className={`${styles.flame_main} ${styles.five}`}
                      fill="#FDBA16"
                      d="M62.049,104.171c0,0-15.645,67.588,10.529,77.655C98.753,191.894,69.033,130.761,62.049,104.171z"
                    />
                    <path
                      className={`${styles.flame}`}
                      fill="#F36E21"
                      d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"
                    />
                    <path
                      className={`${styles.flame} ${styles.one}`}
                      fill="#F36E21"
                      d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"
                    />
                    <path
                      className={`${styles.flame} ${styles.two}`}
                      fill="#F36E21"
                      d="M54.918,104.595c0,0-3.959,6.109-1.24,8.949C56.93,113.256,52.228,107.329,54.918,104.595z"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <Image
              src={wood}
              alt="wood"
              height={300}
              width={400}
              id="wood"
              className={styles.wood}
            />
            <div className={styles.smokeWrap}>
              <Image className={styles.smoke} src={smoke} alt="smoke" />
            </div>
            <div className={styles.smokeWrap}>
              <Image className={styles.smoke2} src={smoke} alt="smoke" />
            </div>
            <div className={styles.smokeWrap}>
              <Image className={styles.smoke3} src={smoke} alt="smoke" />
            </div>

            <div
              className={`hiddenBox scale-0 absolute   right-[50%] flex  z-[-1] bg-[#bc7f37] dark:bg-[#b25518] h-full rounded-3xl  justify-center items-center dark:border dark:border-x-2 dark:border-y-2 border-[#bc7f37] ${styles.thirdContainer}`}
            >
              <div className={` h-full ${styles.thirdExtra}`}></div>
              <p
                style={{ lineHeight: '2' }}
                className={`w-1/2 sm:text-2xl text-xl textup1 inline-block overflow-hidden dark:text-[#ffffffe7] text-[#111111] ${styles.thirdText}`}
              >
                هل لديك وصفة خاصة ترغب في مشاركتها؟{' '}
                <span
                  className="relative bg-gradient-to-l dark:from-[#907d38] dark:to-[#907d38] 
                from-[#907d38] to-[#907d38]
                bg-no-repeat bg-[length:0%_100%]  bg-[right]  highliter"
                >
                  سجل الدخول لإضافة وصفتك الشهية
                </span>
                ومشاركتها مع الآخرين.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[700px]"></div>
    </div>
  );
};

export default Features;
