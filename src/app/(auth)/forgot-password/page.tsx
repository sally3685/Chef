'use client';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import { CircleCheck, CirclePlus, Eye, EyeOff } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useAnimation } from '@/helpers/useAnimation';
import { useEffect } from 'react';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import TransportLink from '@/components/transportLink';
import gsap from 'gsap';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const CODE_REGEX = /^[0-9]{6}$/;
export default function ForgotPasswordPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const passdwordRef = useRef<HTMLInputElement>(null);
  const [submit, setsubmit] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [ValidCode, setValidCode] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [errorsPassword, setErrorsPassword] = useState<ClerkAPIError[]>();
  const [errorsEmail, setErrorsEmail] = useState<ClerkAPIError[]>();
  const [errorsCode, setErrorsCode] = useState<ClerkAPIError[]>();
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [codeFocus, setCodeFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  useEffect(() => {
    emailRef?.current?.focus();
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
        if (EMAIL_REGEX.test(email) && !errorsEmail) {
          value = '8.9rem';
          if (PWD_REGEX.test(password) && !errorsPassword) {
            value = '13rem';
            // if (PWD_REGEX.test(password) && !errorsPassword) {
            //   value = '18.2rem';
            // }
          }
        } else {
          if (!EMAIL_REGEX.test(email) || errorsEmail) {
            value = '2.25rem';
          } else {
            value = '8.9rem';
          }
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
        setValidEmail(EMAIL_REGEX.test(email));
      });
      return () => ctx.revert();
    }
  }, [email, errorsEmail]);

  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer3 = document.getElementById('layer3');
      let ctx = gsap.context(() => {
        let value;
        if (PWD_REGEX.test(password) && !errorsPassword) {
          value = '7rem';
          if (CODE_REGEX.test(code) && !errorsCode) {
            value = '14.65rem';
            // if (PWD_REGEX.test(password) && !errorsPassword) {
            //   value = '18.2rem';
            // }
          }
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
          .to(layer3, {
            top: value,
          });
        setValidPwd(PWD_REGEX.test(password));
      });
      return () => ctx.revert();
    }
  }, [password, errorsPassword]);
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer3 = document.getElementById('layer3');
      const layer4 = document.getElementById('layer4');
      let ctx = gsap.context(() => {
        setValidCode(CODE_REGEX.test(code));
        let valueE;
        let valueU;
        if (CODE_REGEX.test(code) && !errorsCode) {
          valueE = '8.55rem';
          valueU = '12.65rem';

          // if (PWD_REGEX.test(password) && !errorsPassword) {
          //   valueE = '14rem';
          //   valueU = '18.2rem';
          // }
          if (!PWD_REGEX.test(password) || errorsPassword) {
            valueU = '2.25rem';
          }
        } else {
          valueE = '3rem';
          valueU = '7rem';

          if (!PWD_REGEX.test(password) || errorsPassword) {
            valueU = '2.25rem';
          }
        }
        tl.current = gsap
          .timeline({
            defaults: {
              duration: 1.5,
              ease: 'bounce',
            },
          })
          .to(layer3, {
            top: valueU,

            delay: 0.02,
          })
          .to(
            layer4,
            {
              top: valueE,
            },
            '='
          );
      });
      return () => ctx.revert();
    }
  }, [code, errorsCode]);

  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    setsubmit(true);
    setErrorsPassword(undefined);
    setErrorsEmail(undefined);
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError('');
        setFirstSubmit(true);
        setsubmit(false);
      })
      .catch((err) => {
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
            } else if (el.meta?.paramName === 'identifier') {
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
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setsubmit(true);
    setErrorsPassword(undefined);
    setErrorsEmail(undefined);
    setErrorsCode(undefined);
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          setFirstSubmit(true);
          setsubmit(false);
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
        }
      })
      .catch((err) => {
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
            } else if (el.meta?.paramName === 'password') {
              setErrorsPassword((prev) => {
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
        } else if (errorsPassword) {
          passdwordRef.current?.focus();
        }
        setFirstSubmit(true);
      });
  }

  return (
    <main className="flex gap-10 justify-center items-center mx-auto p-4  max-w-7xl section-min-height  lg:flex-row flex-col-reverse">
      <div className="lg:w-1/2 w-[85%]">
        <h1 className="enterAnimation relative text-3xl font-medium mb-4 text-center">
          نسيت كلمة المرور
        </h1>
        {submit && (
          <h2 className="text-center">يتم متابعة الطلب الرجاء الانتظار ...</h2>
        )}
        <form
          className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && (
            <>
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
                  className="w-full !rounded text-[#151517] p-2 bg-white"
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  aria-describedby="emailnote"
                  required
                  aria-invalid={errorsEmail ? 'false' : 'true'}
                  aria-errormessage="email-error"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <div
                  id="layer1"
                  className=" absolute w-[80px] h-[30px] lg:w-[93px] lg:h-[34px] bg-[url(/salmon.svg)] bg-cover bg-no-repeat bg-center  top-9 !m-0 left-0 lg:right-[103%] "
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
              <div className="enterAnimation flex z-[1] justify-center items-center relative w-full top-[40px]">
                <div className="w-[81px] h-[30px] lg:w-[93px] lg:h-[35px] absolute bg-[url(/toastL.svg)] bg-cover bg-no-repeat bg-center  top-[1rem] left-0 m-0 lg:!right-[103%]"></div>
                <button
                  type="submit"
                  disabled={submit ? true : false}
                  className="w-1/2 m-auto rounded p-2 bg-orange-400"
                >
                  ارسال كود لتغيير كلمة المرور
                </button>{' '}
              </div>
              {/* {error && <p>{error}</p>} */}
            </>
          )}

          {successfulCreation && (
            <>
              <div className="enterAnimation flex relative z-[3] flex-col space-y-2 items-start  w-full">
                <label
                  htmlFor="password"
                  className="flex space-x-3 justify-center items-center text-lg "
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
                  className="w-full rounded !text-[#151517]  p-2 bg-white"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  aria-describedby="passwordnote"
                  required
                  aria-invalid={errorsPassword ? 'false' : 'true'}
                  aria-errormessage="password-error"
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <div
                  id="layer3"
                  className=" absolute w-[65px] h-[39px] lg:w-[87px] lg:h-[50px] bg-[url(/toast1.svg)] bg-cover bg-no-repeat bg-center  top-9 !m-0 left-0 lg:right-[103%] "
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
              <div className="enterAnimation z-[2] flex flex-col items-start space-y-2 w-full relative">
                <label
                  htmlFor="code"
                  className="flex space-x-3 text-lg justify-center items-center  "
                  title={
                    errorsCode
                      ? 'خطأ بالادخال'
                      : firstSubmit && !errorsCode
                      ? 'ادخال صحيح'
                      : ''
                  }
                >
                  {' '}
                  ادخل كود تغيير كلمة المرور الذي ارسل لبريدك الالكتروني
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
                  autoComplete="new-code"
                  className="w-full rounded !text-[#151517]  p-2 bg-white"
                  id="code"
                  type="code"
                  name="code"
                  value={code}
                  aria-describedby="codenotes"
                  required
                  aria-invalid={errorsCode ? 'false' : 'true'}
                  aria-errormessage="code-error"
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={() => setCodeFocus(true)}
                  onBlur={() => setCodeFocus(false)}
                />
                <div
                  id="layer4"
                  className="lg:w-[90px] lg:h-[33px] w-[67px] h-[24px] absolute bg-[url(/salmon.svg)] bg-cover bg-no-repeat bg-center  top-12 !m-0 left-0 lg:right-[103%] "
                ></div>
                <div
                  id="code-error"
                  aria-live="assertive"
                  className={
                    errorsCode ? 'block text-sm text-red-600' : 'hidden'
                  }
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
              <div className="enterAnimation flex z-[1] justify-center items-center relative w-full top-[36px]">
                <div className="w-[73px] h-[27px] lg:w-[87px] lg:h-[33px] top-[14px] absolute bg-[url(/toastL.svg)] bg-cover bg-no-repeat bg-center  left-0 m-0 lg:!right-[103%]"></div>
                <button
                  type="submit"
                  disabled={submit ? true : false}
                  className="w-1/2 m-auto rounded p-2 bg-orange-400"
                >
                  تغيير الكلمة
                </button>
              </div>
              {/* {error && <p>{error}</p>} */}
            </>
          )}

          {/* {secondFactor && (
          <p>2FA is required, but this UI does not handle that</p>
        )} */}
        </form>
      </div>{' '}
      <div
        id="container"
        className="lg:h-[400px] h-20 overflow-hidden lg:overflow-visible lg:w-1/2 w-[85%] relative "
      >
        {!successfulCreation ? (
          <div
            className={`enterAnimation1 absolute h-[45px] top-3 lg:top-[12rem] justify-center lg:justify-end gap-6 items-center w-full  ${
              emailFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!validEmail ? (
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
              id="emailnotes"
              className={
                !validEmail ? 'text-white w-3/4' : 'text-[#808080] w-3/4'
              }
            >
              يحتوي على علامة @ ويحتوي على أحرف قبل @
            </p>
          </div>
        ) : (
          <>
            <div
              className={`enterAnimation1 absolute h-[45px] top-3 lg:top-[9rem] justify-center lg:justify-end gap-6 items-center w-full   ${
                passwordFocus ? 'flex' : 'hidden'
              } lg:flex`}
            >
              {!validPwd ? (
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
                id="passwordnotes"
                className={
                  !validPwd ? 'text-white w-3/4' : 'text-[#808080] w-3/4'
                }
              >
                يجب أن يحتوي على 8 إلى 24 حرفًا، ويشمل حرفًا كبيرًا وحرفًا
                صغيرًا، ورقمًا، وحرفًا خاصًا. الرموز الخاصة المسموحة:! @ $ % #
              </p>
            </div>

            <div
              className={`enterAnimation1 absolute h-[29px] top-3 lg:top-[15rem] justify-center lg:justify-end gap-6 items-center w-full ${
                codeFocus ? 'flex' : 'hidden'
              } lg:flex`}
            >
              {!ValidCode ? (
                <span
                  className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%]"
                  style={{ border: '2px solid white' }}
                >
                  2
                </span>
              ) : (
                <CircleCheck color="grey" />
              )}
              <p
                id="codenotes"
                className={
                  !ValidCode ? 'text-white w-3/4' : 'text-[#808080]  w-3/4'
                }
              >
                يجب كتابة الكود المرسل للايميل الذي ادخلته في الخطوة السابقة
              </p>
            </div>
          </>
        )}

        <div
          className={`enterAnimation1 hidden lg:flex justify-center lg:justify-end absolute h-[32px] top-3   gap-6 items-center w-full 
            ${!successfulCreation ? 'lg:top-[19rem]' : 'lg:top-[21rem]'}
            `}
        >
          {/* lg:top-52 top-3  */}
          {!submit ? (
            <span
              className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%]"
              style={{ border: '2px solid white' }}
            >
              {!successfulCreation ? 2 : 3}
            </span>
          ) : (
            <CircleCheck color="grey" />
          )}
          <p className={!submit ? 'text-white w-3/4' : 'text-[#808080]  w-3/4'}>
            اضغط على متابعة وفي حال ظهور رسائل خطأ صحح الاخطاء واضغط مجددا
            للتحقق
          </p>
        </div>

        <div
          className={`enterAnimation1 lg:hidden justify-center lg:justify-end absolute h-[32px] top-3 lg:top-[19rem]  gap-6 items-center w-full  ${
            !passwordFocus && !codeFocus && !emailFocus ? 'flex' : 'hidden'
          }`}
        >
          <p className={!submit ? 'text-white w-3/4' : 'text-[#808080]  w-3/4'}>
            املأ الحقول واضغط على متابعة وفي حال ظهور رسائل خطأ صحح الاخطاء
            واضغط مجددا للتحقق
          </p>
        </div>
      </div>
    </main>
  );
}
