'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CircleCheck, CirclePlus, Eye, EyeOff } from 'lucide-react';
import { useRef, useState } from 'react';
import { useAnimation } from '@/helpers/useAnimation';
import { useEffect } from 'react';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import TransportLink from '@/components/transportLink';
import OauthSignIn from '../../email';
import gsap from 'gsap';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export default function SignInForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passdwordRef = useRef<HTMLInputElement>(null);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordEye, setPasswordEye] = React.useState(false);
  const [submit, setsubmit] = React.useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [errorsPassword, setErrorsPassword] = React.useState<ClerkAPIError[]>();
  const [errorsEmail, setErrorsEmail] = React.useState<ClerkAPIError[]>();
  const [firstSubmit, setFirstSubmit] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);
  const tl = useRef(
    gsap.timeline({
      paused: true,
    })
  );
  const [emailValuePrev, setEmailValuePrev] = useState('2.25rem');
  const [pswValuePrev, setPswValuePrev] = useState('3rem');
  useAnimation(() => {
    if (EMAIL_REGEX.test(email) !== validEmail) {
      setValidEmail(EMAIL_REGEX.test(email));
    }
  }, [email, errorsEmail]);
  useAnimation(() => {
    if (PWD_REGEX.test(password) !== validPwd) {
      setValidPwd(PWD_REGEX.test(password));
    }
  }, [password, errorsPassword]);
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer1 = document.getElementById('layer1');
      let ctx = gsap.context(() => {
        let valueToE;
        if (EMAIL_REGEX.test(email) && !errorsEmail) {
          valueToE = '7rem';
          if (PWD_REGEX.test(password) && !errorsPassword) {
            valueToE = '12.65rem';
          }
        } else {
          valueToE = '2.25rem';
        }
        gsap.defaults({
          duration: 1.5,
          ease: 'bounce',
        });
        gsap.fromTo(
          layer1,
          {
            top: emailValuePrev,
          },
          {
            top: valueToE,
          }
        );
        setEmailValuePrev(valueToE);
        setValidEmail(EMAIL_REGEX.test(email));
      });
      return () => ctx.revert();
    }
  }, [validEmail]);

  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer1 = document.getElementById('layer1');
      const layer2 = document.getElementById('layer2');
      let ctx = gsap.context(() => {
        setValidPwd(PWD_REGEX.test(password));
        let valueToE;
        let valueToU;
        if (PWD_REGEX.test(password) && !errorsPassword) {
          valueToE = '8.55rem';
          valueToU = '12.65rem';
          if (!EMAIL_REGEX.test(email) || errorsEmail) {
            valueToU = '2.25rem';
          }
        } else {
          valueToE = '3rem';
          valueToU = '7rem';

          if (!EMAIL_REGEX.test(email) || errorsEmail) {
            valueToU = '2.25rem';
          }
        }
        tl.current = gsap
          .timeline({
            defaults: {
              duration: 1.5,
              ease: 'bounce',
            },
          })
          .fromTo(
            layer1,
            {
              top: emailValuePrev,
            },
            {
              top: valueToU,

              delay: 0.02,
            }
          )
          .fromTo(
            layer2,
            {
              top: pswValuePrev,
            },
            {
              top: valueToE,
            },
            '='
          );
        setPswValuePrev(valueToE);
        setEmailValuePrev(valueToU);
      });
      return () => ctx.revert();
    }
  }, [validPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setsubmit(true);
    if (!isLoaded) {
      return;
    }
    setErrorsPassword(undefined);
    setErrorsEmail(undefined);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      setFirstSubmit(true);
      setsubmit(false);
      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/');
      } else {
      }
    } catch (err) {
      setsubmit(false);
      if (isClerkAPIResponseError(err)) {
        err.errors.map((el: any) => {
          if (el.meta?.paramName === 'password') {
            setErrorsPassword((prev) => {
              let p = prev;
              if (!p) p = [el];
              else p.push(el);
              return p;
            });
          } else if (el.meta?.paramName === 'email') {
            setErrorsEmail((prev) => {
              let p = prev;
              if (!p) p = [el];
              else p.push(el);
              return p;
            });
          }
        });
      }
      if (errorsEmail) {
        emailRef?.current?.focus();
      } else if (errorsPassword) {
        passdwordRef.current?.focus();
      }
      setFirstSubmit(true);
    }
  };

  // Display a form to capture the user's email and password
  return (
    <>
      <main className="flex gap-4 lg:gap-10 justify-center items-center mx-auto p-4  max-w-7xl section-min-height  lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 w-[85%]">
          <>
            <h1 className="enterAnimation relative text-3xl font-medium mb-4 text-center">
              {' '}
              تسجيل دخول
            </h1>
            {submit && (
              <h2 className="text-center">
                يتم متابعة الطلب الرجاء الانتظار ...
              </h2>
            )}
            <form
              className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="enterAnimation flex relative z-[3] flex-col space-y-2 items-start  w-full">
                <label
                  htmlFor="email"
                  className="flex space-x-3 justify-center items-center text-lg"
                  title={
                    errorsEmail
                      ? 'خطأ بالادخال'
                      : firstSubmit && !errorsEmail
                      ? 'ادخال صحيح'
                      : ''
                  }
                >
                  {' '}
                  البريد الالكتروني
                  <CircleCheck
                    color="#18f231"
                    className={errorsEmail || !validEmail ? 'hidden' : 'block'}
                  />
                  <CirclePlus
                    color="red"
                    style={{ transform: 'rotate(45deg)' }}
                    className={errorsEmail ? 'block' : 'hidden'}
                  />
                </label>
                <input
                  ref={emailRef}
                  className="w-full !rounded text-[#151517] dark:bg-white bg-[#d3b577b5] p-2"
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  aria-describedby="emailnotes"
                  required
                  aria-invalid={errorsEmail ? 'false' : 'true'}
                  aria-errormessage="email-error"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <div
                  id="layer1"
                  className=" absolute w-[65px] h-[39px] lg:w-[83px] lg:h-[50px] bg-[url(/toast1.svg)] bg-cover bg-no-repeat bg-center  top-9 !m-0 left-0 lg:right-[103%] "
                ></div>
                <div
                  id="email-error"
                  aria-live="assertive"
                  className={
                    errorsEmail ? 'block text-sm text-red-600' : 'hidden'
                  }
                >
                  {errorsEmail && (
                    <ul>
                      {errorsEmail.map((el, index) => (
                        <li key={index}>{el.longMessage}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="enterAnimation z-[2] flex flex-col items-start space-y-2 w-full relative ">
                <label
                  htmlFor="password"
                  className="flex space-x-3 text-lg justify-center items-center "
                  title={
                    errorsPassword
                      ? 'خطأ بالادخال'
                      : firstSubmit && !errorsPassword
                      ? 'ادخال صحيح'
                      : ''
                  }
                >
                  {' '}
                  كلمة المرور
                  <CircleCheck
                    color="#18f231"
                    className={errorsPassword || !validPwd ? 'hidden' : 'block'}
                  />
                  <CirclePlus
                    color="red"
                    style={{ transform: 'rotate(45deg)' }}
                    className={errorsPassword ? 'block' : 'hidden'}
                  />
                </label>
                <input
                  ref={passdwordRef}
                  autoComplete="current-password"
                  className="w-full rounded !text-[#151517] dark:bg-white bg-[#d3b577b5] p-2"
                  id="password"
                  type={!passwordEye ? 'password' : 'text'}
                  name="password"
                  value={password}
                  aria-describedby="passwordnotes"
                  required
                  aria-invalid={errorsPassword ? 'false' : 'true'}
                  aria-errormessage="password-error"
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <div
                  onClick={() => {
                    setPasswordEye(!passwordEye);
                  }}
                  className="w-[30px] h-[30px] absolute left-[12%] lg:left-0 top-1/2"
                >
                  {!passwordEye ? (
                    <EyeOff color="black" />
                  ) : (
                    <Eye color="black" />
                  )}
                </div>
                <div
                  id="layer2"
                  // 88 24
                  className="lg:w-[88px] lg:h-[29px] w-[67px] h-[24px] absolute bg-[url(/cheeseTomato.svg)] bg-cover bg-no-repeat bg-center  top-12 !m-0 left-0 lg:right-[103%] "
                ></div>
                <div
                  id="password-error"
                  aria-live="assertive"
                  className={
                    errorsPassword ? 'block text-sm text-red-600' : 'hidden'
                  }
                >
                  {errorsPassword && (
                    <ul>
                      {errorsPassword.map((el, index) => (
                        <li key={index}>{el.longMessage}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="enterAnimation flex z-[1] justify-center items-center relative w-full">
                <div className="w-[68px] h-[21px] lg:w-[85px] lg:h-[27px] absolute bg-[url(/toast2.svg)] bg-cover bg-no-repeat bg-center  top-12 left-0 m-0 lg:!right-[103%]"></div>

                <button
                  type="submit"
                  disabled={submit ? true : false}
                  className="w-1/2 m-auto rounded p-2 bg-orange-400"
                >
                  ارسال
                </button>
              </div>
            </form>

            <section className="enterAnimation relative flex space-x-4 text-lg dark:text-[#d8d8d8] text-[#272727] justify-center items-center">
              <p>ليس لديك حساب ? </p>

              <TransportLink href={'/sign-up'} label={'انشاء حساب'} />
              {/* <Link href="/sign-up">انشاء حساب</Link> */}
            </section>
            <section className="enterAnimation flex space-x-4 text-lg dark:text-[#d8d8d8] text-[#272727] justify-center items-center relative">
              <p>نسيت كلمة السر ? </p>

              <TransportLink href={'/forgot-password'} label={'اضفط هنا'} />
              {/* <Link href="/forgot-password">اضفط هنا</Link> */}
            </section>
            <section className="enterAnimation relative">
              <OauthSignIn />
            </section>
          </>
        </div>
        <div
          id="container"
          className="lg:h-[400px] h-20 overflow-hidden lg:overflow-visible lg:w-1/2 w-[85%] relative "
        >
          <div
            className={`enterAnimation1 absolute h-[45px] top-12 justify-center lg:justify-end gap-6 items-center w-full  ${
              emailFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!validEmail ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                1
              </span>
            ) : (
              <CircleCheck color="grey" />
            )}
            <p
              id="emailnotes"
              className={
                !validEmail
                  ? 'dark:text-white text-black w-3/4'
                  : 'text-[#808080] w-3/4'
              }
            >
              يحتوي على علامة @ ويحتوي على أحرف قبل @
            </p>
          </div>

          <div
            className={`enterAnimation1 absolute h-[29px] top-3 lg:top-[6.5rem] justify-center lg:justify-end gap-6 items-center w-full ${
              passwordFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!validPwd ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                2
              </span>
            ) : (
              <CircleCheck color="grey" />
            )}
            <p
              id="passwordnotes"
              className={
                !validPwd
                  ? 'dark:text-white text-black w-3/4'
                  : 'text-[#808080]  w-3/4'
              }
            >
              يجب أن يحتوي على 8 إلى 24 حرفًا، ويشمل حرفًا كبيرًا وحرفًا صغيرًا،
              ورقمًا، وحرفًا خاصًا. الرموز الخاصة المسموحة:! @ $ % #
            </p>
          </div>

          <div
            className={`enterAnimation1 hidden lg:flex justify-center lg:justify-end absolute h-[32px] top-3 lg:top-[10.5rem]  gap-6 items-center w-full `}
          >
            {/* lg:top-52 top-3  */}
            {!submit ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                3
              </span>
            ) : (
              <CircleCheck color="grey" />
            )}
            <p
              className={
                !submit
                  ? 'dark:text-white text-black w-3/4'
                  : 'text-[#808080]  w-3/4'
              }
            >
              اضغط على متابعة وفي حال ظهور رسائل خطأ صحح الاخطاء واضغط مجددا
              للتحقق
            </p>
          </div>

          <div
            className={`enterAnimation1 lg:hidden justify-center lg:justify-end absolute h-[32px] top-3 lg:top-[19rem]  gap-6 items-center w-full ${
              !passwordFocus && !emailFocus ? 'flex' : 'hidden'
            }`}
          >
            <p
              className={
                !submit
                  ? 'dark:text-white text-black w-3/4'
                  : 'text-[#808080]  w-3/4'
              }
            >
              املأ الحقول واضغط على متابعة وفي حال ظهور رسائل خطأ صحح الاخطاء
              واضغط مجددا للتحقق
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
