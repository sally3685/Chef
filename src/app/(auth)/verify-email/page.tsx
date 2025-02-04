'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useAnimation } from '@/helpers/useAnimation';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

import { CircleCheck, CirclePlus, Eye, EyeOff } from 'lucide-react';

import { postUser } from '@/data-access/users';
const CODE_REGEX = /^[0-9]{6}$/;
import gsap from 'gsap';
import { serverUser } from '@/actions/user';
const verifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const codeRef = useRef<HTMLInputElement>(null);
  const [submit, setsubmit] = useState(false);
  const [ValidCode, setValidCode] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [errorsCode, setErrorsCode] = useState<ClerkAPIError[]>();
  const [codeFocus, setCodeFocus] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    codeRef?.current?.focus();
    // passdwordRef?.current?.focus();
  }, []);
  const tl = useRef(
    gsap.timeline({
      paused: true,
    })
  );
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer1 = document.getElementById('layer1');
      let ctx = gsap.context(() => {
        let value;
        if (CODE_REGEX.test(code) && !errorsCode) {
          value = '8.5rem';
        } else {
          value = '2.25rem';
        }
        tl.current = gsap
          .timeline({
            defaults: {
              duration: 1.5,
              ease: 'bounce',
            },
          })
          .to(layer1, {
            top: value,
          });
        setValidCode(CODE_REGEX.test(code));
      });
      return () => ctx.revert();
    }
  }, [code, errorsCode]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmit(true);
    setErrorsCode(undefined);
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      setFirstSubmit(true);
      setsubmit(false);
      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        try {
          const a = await serverUser(
            signUpAttempt?.createdUserId!,
            signUpAttempt?.username!
          );
          router.push('/');
        } catch (error) {
          throw new Error('something went wrong');
        }
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
      }
    } catch (err: any) {
      setsubmit(false);
      if (isClerkAPIResponseError(err)) {
        err.errors.map((el: any) => {
          if (el.meta?.paramName === 'code') {
            setErrorsCode((prev) => {
              let p = prev;
              if (!p) p = [el];
              else p.push(el);
              return p;
            });
          }
        });
      }
      if (errorsCode) {
        codeRef?.current?.focus();
      } else if (errorsCode) {
        codeRef.current?.focus();
      }
      setFirstSubmit(true);
    }
  };
  return (
    <>
      <main className="flex gap-10 justify-center items-center mx-auto p-4  max-w-7xl section-min-height  lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 w-[85%]">
          <h1 className="enterAnimation relative text-3xl font-medium mb-4 text-center">
            تاكيد حسابك
          </h1>
          {submit && (
            <h2 className="text-center">
              يتم متابعة الطلب الرجاء الانتظار ...
            </h2>
          )}

          <form
            onSubmit={handleVerify}
            className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
          >
            <div className="enterAnimation flex relative z-[3] flex-col space-y-2 items-start  w-full">
              <label
                htmlFor="code"
                className="flex space-x-3 justify-center items-center text-lg"
                title={
                  errorsCode
                    ? 'خطأ بالادخال'
                    : firstSubmit && !errorsCode
                    ? 'ادخال صحيح'
                    : ''
                }
              >
                {' '}
                ادخال الكود الذي تم ارساله للبريد
                <CircleCheck
                  color="#18f231"
                  className={errorsCode || !ValidCode ? 'hidden' : 'block'}
                />
                <CirclePlus
                  color="red"
                  style={{ transform: 'rotate(45deg)' }}
                  className={errorsCode ? 'block' : 'hidden'}
                />
              </label>
              <input
                ref={codeRef}
                className="w-full !rounded bg-white text-[#151517] p-2"
                id="code"
                type="code"
                name="code"
                value={code}
                aria-describedby="codenote"
                required
                aria-invalid={errorsCode ? 'false' : 'true'}
                aria-errormessage="code-error"
                onChange={(e) => setCode(e.target.value)}
                onFocus={() => setCodeFocus(true)}
                onBlur={() => setCodeFocus(false)}
              />
              <div
                id="layer1"
                className=" absolute w-[79px] h-[28px] lg:w-[90px] lg:h-[28px] bg-[url(/cucumber.svg)] bg-cover bg-no-repeat bg-center  top-9 !m-0 left-0 lg:right-[103%] "
              ></div>
              <div
                id="code-error"
                aria-live="assertive"
                className={errorsCode ? 'block text-sm text-red-600' : 'hidden'}
              >
                {errorsCode && (
                  <ul>
                    {errorsCode.map((el, index) => (
                      <li key={index}>{el.longMessage}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="enterAnimation flex z-[1] justify-center items-center relative w-full">
              <div className="w-[84px] h-[30px] lg:w-[104px] lg:h-[36px] absolute bg-[url(/mayo.svg)] bg-cover bg-no-repeat bg-center  top-12 left-0 m-0 lg:!right-[103%]"></div>
              <button type="submit" className="w-1/2 rounded p-2 bg-orange-400">
                تاكيد
              </button>
            </div>
          </form>
        </div>
        <div
          id="container"
          className="lg:h-[400px] h-20 overflow-hidden lg:overflow-visible lg:w-1/2 w-[85%] relative "
        >
          <div
            className={`enterAnimation1 absolute h-[45px] top-3 lg:top-[12rem] justify-center lg:justify-end gap-6 items-center w-full  ${
              codeFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!ValidCode ? (
              <span
                className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%]"
                style={{ border: '2px solid white' }}
              >
                1
              </span>
            ) : (
              <CircleCheck color="grey" />
            )}
            <p
              id="codenotes"
              className={
                !ValidCode ? 'text-white w-3/4' : 'text-[#808080] w-3/4'
              }
            >
              يحتوي على علامة @ ويحتوي على أحرف قبل @
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default verifyEmail;
