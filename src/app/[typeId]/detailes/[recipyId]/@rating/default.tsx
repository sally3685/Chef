'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';
export default function Rating() {
  const [ratio, setRatio] = useState(['1', '1', '', '', '']);

  const handleClick = (index: number) => {
    const newRatio = ratio.map((_, i) => (i <= index ? '1' : ''));
    setRatio(newRatio);
  };
  useGSAP(() => {
    const animateSections = () => {
      gsap.defaults({ ease: 'back.in', duration: 1.5 });
      const tl = gsap.timeline();
      tl.to('.c1', {
        cx: '10',
        cy: '10',
        transformOrigin: '50% 50%',
      })
        .to(
          '.c2',
          {
            cx: '37',
            cy: '10',
            transformOrigin: '50% 50%',
          },
          '<'
        )
        .to(
          '.c3',
          {
            cx: '5',
            cy: '32',
            transformOrigin: '50% 50%',
          },
          '<'
        )
        .to(
          '.c4',
          {
            cx: '43',
            cy: '32',
            transformOrigin: '50% 50%',
          },
          '<'
        )
        .to(
          '.c5',
          {
            cx: '25',
            cy: '46',
            transformOrigin: '50% 50%',
          },
          '<'
        )
        .fromTo(
          '.svg',
          {
            rotate: 0,
            transformOrigin: '50% 50%',
          },
          {
            rotate: 360,
            transformOrigin: '50% 50%',
          },
          '+=0.1'
        )
        .to(
          '.smile',
          {
            attr: {
              fill: 'black',
            },
            duration: 0.1,
          },
          '<'
        )
        .to('.c', {
          cx: '25',
          cy: '25',
          transformOrigin: '50% 50%',
        })
        .to(
          '.smile',
          {
            attr: {
              fill: 'none',
            },
            duration: 0.1,
          },
          '<'
        );
    };
    const animateLids = () => {
      const tl2 = gsap.timeline();
      tl2
        .fromTo(
          ['.lid1', '.lid2'],
          {
            attr: {
              y1: '18.5',
              y2: '18.5',
            },
          },
          {
            attr: {
              y1: '17',
              y2: '17',
            },
            repeat: -1,
            repeatDelay: 5,
            duration: 0.5,
          }
        )
        .fromTo(
          ['.lid11', '.lid22'],
          {
            attr: {
              y1: '21',
              y2: '21',
            },
          },
          {
            attr: {
              y1: '23',
              y2: '23',
            },
            repeat: -1,
            repeatDelay: 5,
            duration: 0.5,
          },
          '<'
        );
    };
    const resetAnimations = () => {
      gsap.to('.c, .smile', {
        clearProps: 'all',
      });
    };
    resetAnimations();
    animateSections();
    animateLids();
  }, [ratio]);
  return (
    <>
      <div className="flex flex-col gap-4 dark:text-white justify-center items-center text-black text-xl sm:text-2xl text-center font-bold">
        <h2>تقييم المستخدمين</h2>
        <div className="w-full flex gap-4 justify-center items-center overflow-visible h-[40px]">
          {ratio.map((p, index) => (
            <svg
              key={index}
              height="40px"
              width="40px"
              version="1.1"
              viewBox="0 0 47.94 47.94"
              className={p === '1' ? 'svg' : ''}
              onClick={() => handleClick(index)}
            >
              <path
                className={p === '1' ? 'star' : ''}
                style={p === '1' ? { fill: '#fbef6e' } : { fill: '#2f2c2c' }}
                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.117,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
              />

              <circle
                className="eye"
                r="1"
                cx="30"
                cy="20"
                fill="#000000"
                style={{
                  stroke: 'black',
                }}
              />
              <circle
                className="eye"
                r="1"
                cx="17"
                cy="20"
                fill="#000000"
                style={{
                  stroke: 'black',
                }}
              />
              <circle
                className={p === '1' ? 'c1 c' : ''}
                r="1"
                cx="25"
                cy="25"
                fill={p === '1' ? '#fbef6e' : '#2f2c2c'}
                style={{
                  filter: 'dropShadow(1px 1px 2px rgba(252, 240, 113, 0.7))',
                }}
              />
              <circle
                className={p === '1' ? 'c2 c' : ''}
                r="1"
                cx="25"
                cy="25"
                fill={p === '1' ? '#fbef6e' : '#2f2c2c'}
                style={{
                  filter: 'dropShadow(0px 0px 2px rgba(252, 240, 113, 0.7))',
                }}
              />
              <circle
                className={p === '1' ? 'c3 c' : ''}
                r="1"
                cx="25"
                cy="25"
                fill={p === '1' ? '#fbef6e' : '#2f2c2c'}
                style={{
                  filter: 'dropShadow(0px 0px 2px rgba(252, 240, 113, 0.7))',
                }}
              />
              <circle
                className={p === '1' ? 'c4 c' : ''}
                r="1"
                cx="25"
                cy="25"
                fill={p === '1' ? '#fbef6e' : '#2f2c2c'}
                style={{
                  filter: 'dropShadow(0px 0px 2px rgba(252, 240, 113, 0.7))',
                }}
              />
              <circle
                className={p === '1' ? 'c5 c' : ''}
                r="1"
                cx="25"
                cy="25"
                fill={p === '1' ? '#fbef6e' : '#2f2c2c'}
                style={{
                  filter: 'dropShadow(0px 0px 2px rgba(252, 240, 113, 0.7))',
                }}
              />
              <line
                className="lid2"
                x1="28"
                y1="17"
                x2="32"
                y2="17"
                style={
                  p === '1'
                    ? { strokeWidth: 2.5, stroke: '#fbef6e' }
                    : { strokeWidth: 2.5, stroke: '#2f2c2c' }
                }
              />
              <line
                className="lid22"
                x1="28"
                y1="23"
                x2="32"
                y2="23"
                style={
                  p === '1'
                    ? { strokeWidth: 2.5, stroke: '#fbef6e' }
                    : { strokeWidth: 2.5, stroke: '#2f2c2c' }
                }
              />
              <line
                className="lid1"
                x1="15"
                y1="17"
                x2="20"
                y2="17"
                style={
                  p === '1'
                    ? { strokeWidth: 2.5, stroke: '#fbef6e' }
                    : { strokeWidth: 2.5, stroke: '#2f2c2c' }
                }
              />
              <line
                className="lid11"
                x1="15"
                y1="23"
                x2="20"
                y2="23"
                style={
                  p === '1'
                    ? { strokeWidth: 2.5, stroke: '#fbef6e' }
                    : { strokeWidth: 2.5, stroke: '#2f2c2c' }
                }
              />
              <path
                className="smile"
                d="M21,27 A4,8 0 0,0 27,27"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
              ></path>
            </svg>
          ))}
        </div>
      </div>
    </>
  );
}
