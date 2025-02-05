'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckIcon,
  CircleCheck,
  CirclePlus,
  CrossIcon,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAnimation } from '@/helpers/useAnimation';
import { useRef, useState } from 'react';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useEffect } from 'react';
import TransportLink from '@/components/transportLink';
import OauthSignIn from '../../email';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
import gsap from 'gsap';
export default function Page() {
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passdwordRef = useRef<HTMLInputElement>(null);
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordEye, setPasswordEye] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [submit, setsubmit] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [errorsPassword, setErrorsPassword] = React.useState<ClerkAPIError[]>();
  const [errorsEmail, setErrorsEmail] = React.useState<ClerkAPIError[]>();
  const [errorsUsername, setErrorsUsername] = React.useState<ClerkAPIError[]>();
  const [firstSubmit, setFirstSubmit] = React.useState(false);
  const [userFocus, setUserFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const tl = useRef(
    gsap.timeline({
      paused: true,
    })
  );
  const [userValuePrev, setUserValuePrev] = useState('2.25rem');
  const [emailValuePrev, setEmailValuePrev] = useState('3rem');
  const [pswValuePrev, setPswValuePrev] = useState('3rem');
  useAnimation(() => {
    if (USER_REGEX.test(username) !== validName) {
      setValidName(USER_REGEX.test(username));
    }
  }, [username, errorsUsername]);
  useAnimation(() => {
    if (EMAIL_REGEX.test(emailAddress) !== validEmail) {
      setValidEmail(EMAIL_REGEX.test(emailAddress));
    }
  }, [emailAddress, errorsEmail]);
  useAnimation(() => {
    if (PWD_REGEX.test(password) !== validPwd) {
      setValidPwd(PWD_REGEX.test(password));
    }
  }, [password, errorsPassword]);
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer1 = document.getElementById('layer1');
      let ctx = gsap.context(() => {
        let valueTo;

        if (USER_REGEX.test(username) && !errorsUsername) {
          valueTo = '7rem';
          if (EMAIL_REGEX.test(emailAddress) && !errorsEmail) {
            valueTo = '12.65rem';
            if (PWD_REGEX.test(password) && !errorsPassword) {
              valueTo = '18.2rem';
            }
          }
        } else {
          valueTo = '2.25rem';
        }
        gsap.defaults({
          duration: 1.5,
          ease: 'bounce',
        });
        gsap.fromTo(
          layer1,
          {
            top: userValuePrev,
          },
          {
            top: valueTo,
          }
        );
        setUserValuePrev(valueTo);
      });
      return () => ctx.revert();
    }
  }, [validName]);
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer1 = document.getElementById('layer1');
      const layer2 = document.getElementById('layer2');
      let ctx = gsap.context(() => {
        setValidEmail(EMAIL_REGEX.test(emailAddress));
        let valueToE;
        let valueToU;
        if (EMAIL_REGEX.test(emailAddress) && !errorsEmail) {
          valueToE = '8.55rem';
          valueToU = '12.65rem';

          if (PWD_REGEX.test(password) && !errorsPassword) {
            valueToE = '14rem';
            valueToU = '18.2rem';
          }
          if (!USER_REGEX.test(username) || errorsUsername) {
            valueToU = '2.25rem';
          }
        } else {
          valueToE = '3rem';
          valueToU = '7rem';

          if (!USER_REGEX.test(username) || errorsUsername) {
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
              top: userValuePrev,
            },
            {
              top: valueToU,

              delay: 0.02,
            }
          )
          .fromTo(
            layer2,
            {
              top: emailValuePrev,
            },
            {
              top: valueToE,
            },
            '='
          );
        setUserValuePrev(valueToU);
        setEmailValuePrev(valueToE);
      });
      return () => ctx.revert();
    }
  }, [validEmail]);
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const layer1 = document.getElementById('layer1');
      const layer2 = document.getElementById('layer2');
      const layer3 = document.getElementById('layer3');
      let ctx = gsap.context(() => {
        setValidPwd(PWD_REGEX.test(password));
        let valueToE;
        let valueToU;
        let valueToP;
        if (PWD_REGEX.test(password) && !errorsPassword) {
          valueToE = '14rem';
          valueToU = '18.2rem';
          valueToP = '8.5rem';

          if (!EMAIL_REGEX.test(emailAddress) || errorsEmail) {
            valueToE = '3rem';
            if (!USER_REGEX.test(username) || errorsUsername)
              valueToU = '2.25rem';
            else valueToU = '7rem';
          } else {
            if (!USER_REGEX.test(username) || errorsUsername)
              valueToU = '2.25rem';
          }
        } else {
          valueToE = '8.55rem';
          valueToU = '12.65rem';
          valueToP = '3rem';

          if (!EMAIL_REGEX.test(emailAddress) || errorsEmail) {
            valueToE = '3rem';
            if (!USER_REGEX.test(username) || errorsUsername)
              valueToU = '2.25rem';
            else valueToU = '7rem';
          } else {
            if (!USER_REGEX.test(username) || errorsUsername)
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
            { top: userValuePrev },
            {
              top: valueToU,
              delay: 0.02,
            }
          )
          .fromTo(
            layer2,
            { top: emailValuePrev },
            {
              top: valueToE,

              delay: 0.04,
            },
            '='
          )
          .fromTo(
            layer3,
            { top: pswValuePrev },
            {
              top: valueToP,
            },
            '='
          );
        setPswValuePrev(valueToP);
        setEmailValuePrev(valueToE);
        setUserValuePrev(valueToU);
      });
      return () => ctx.revert();
    }
  }, [validPwd]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmit(true);
    if (!isLoaded) return;
    setErrorsPassword(undefined);
    setErrorsEmail(undefined);
    setErrorsUsername(undefined);
    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);

      setFirstSubmit(true);
      setsubmit(false);
    } catch (err: any) {
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
          } else if (el.meta?.paramName === 'email_address') {
            setErrorsEmail((prev) => {
              let p = prev;
              if (!p) p = [el];
              else p.push(el);
              return p;
            });
          } else if (el.meta?.paramName === 'username') {
            setErrorsUsername((prev) => {
              let p = prev;
              if (!p) p = [el];
              else p.push(el);
              return p;
            });
          }
        });
      }
      if (errorsUsername) {
        userRef?.current?.focus();
      } else if (errorsEmail) {
        emailRef?.current?.focus();
      } else if (errorsPassword) {
        passdwordRef.current?.focus();
      }
      setFirstSubmit(true);
    }
  };

  // Handle the submission of the verification form

  // Display the verification form to capture the OTP code
  if (verifying) {
    router.push('/verify-email');
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <main className="flex gap-4 lg:gap-10 justify-center items-center mx-auto p-4  max-w-7xl section-min-height  lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 w-[85%]">
          <>
            <h1 className="enterAnimation text-3xl font-medium mb-4 text-center">
              {' '}
              انشاء حساب
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
              <div className="enterAnimation flex relative flex-col space-y-2 items-start z-[4]  w-full">
                <label
                  htmlFor="username"
                  className="flex text-lg space-x-3 justify-center items-center "
                  title={
                    errorsUsername
                      ? 'خطأ بالادخال'
                      : firstSubmit && !errorsUsername
                      ? 'ادخال صحيح'
                      : ''
                  }
                >
                  اسم المستخدم
                  <CircleCheck
                    color="#18f231"
                    className={
                      errorsUsername || !validName ? 'hidden' : 'block'
                    }
                  />
                  <CirclePlus
                    color="red"
                    style={{ transform: 'rotate(45deg)' }}
                    className={errorsUsername ? 'block' : 'hidden'}
                  />
                </label>
                <input
                  autoComplete="off"
                  placeholder="john doe"
                  className=" w-full rounded p-2 dark:bg-white bg-[#d3b577b5] text-[#151517]"
                  id="username"
                  type="text"
                  name="username"
                  ref={userRef}
                  value={username}
                  aria-describedby="usernote"
                  required
                  aria-invalid={errorsUsername ? 'false' : 'true'}
                  aria-errormessage="username-error"
                  onChange={(e) => setUsername(e.target.value)}
                  // aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <div
                  id="layer1"
                  className=" absolute w-[65px] h-[39px] lg:w-[80px] lg:h-[45px] bg-[url(/bread2.svg)] bg-cover bg-no-repeat bg-center top-9 !m-0 left-0 lg:right-[103%] "
                ></div>
                {/* <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p> */}
                <div
                  id="username-error"
                  aria-live="assertive"
                  className={
                    errorsUsername ? 'block text-sm text-red-600' : 'hidden'
                  }
                >
                  {errorsUsername && (
                    <ul>
                      {errorsUsername.map((el, index) => (
                        <li key={index}>{el.longMessage}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="enterAnimation flex relative flex-col space-y-2 items-start z-[3] w-full">
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
                  className="w-full !rounded dark:bg-white bg-[#d3b577b5] text-[#151517] p-2"
                  id="email"
                  type="email"
                  name="email"
                  value={emailAddress}
                  aria-describedby="emailnote"
                  required
                  aria-invalid={errorsEmail ? 'false' : 'true'}
                  aria-errormessage="email-error"
                  onChange={(e) => setEmailAddress(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />

                <div
                  id="layer2"
                  className="lg:w-[80px] lg:h-[29px] w-[70px] h-[20px] absolute bg-[url(/cheese.svg)] bg-cover bg-no-repeat bg-center  top-12 !m-0 left-0 lg:right-[103%] "
                  // top-[127px]
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
              <div className="enterAnimation flex flex-col items-start space-y-2 w-full relative z-[2]">
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
                  autoComplete="new-password"
                  className="w-full rounded !text-[#151517] dark:bg-white bg-[#d3b577b5] p-2"
                  id="password"
                  type={!passwordEye ? 'password' : 'text'}
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
                  id="layer3"
                  className="lg:w-[80px] lg:h-[29px] w-[67px] h-[24px] absolute bg-[url(/meat.svg)] bg-cover bg-no-repeat bg-center  top-12 !m-0 left-0 lg:right-[103%] "
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
                <div className="w-[68px] h-[30px] lg:w-[81px] lg:h-[36px] absolute bg-[url(/bread1.svg)] bg-cover bg-no-repeat bg-center  top-12 left-0 m-0 lg:!right-[103%]"></div>{' '}
                <button
                  type="submit"
                  disabled={submit ? true : false}
                  className="w-1/2 m-auto rounded p-2 bg-orange-400"
                >
                  متابعة
                </button>
              </div>
              {/* <TransportLink href={'/sign-in'} label={'متابعة'} /> */}
            </form>
            {/* <button type="button" aria-label="Show password">
  <div class="eye-icon">
</button> 

  Show a loading state to the user
*/}

            <section className="enterAnimation flex space-x-4 text-lg dark:text-[#d8d8d8] text-[#272727] justify-center items-center">
              <p> لديك حساب مسبقا ؟ </p>
              <TransportLink href={'/sign-in'} label={'تسجيل دخول'} />
              {/* <Link href="/sign-in"> تسجيل دخول </Link> */}
            </section>
            <section className="enterAnimation">
              <OauthSignIn />
            </section>
          </>
        </div>
        <div
          id="container"
          className="lg:h-[400px] h-20 overflow-hidden lg:overflow-visible lg:w-1/2 w-[85%] relative "
        >
          <div
            className={`enterAnimation1 absolute h-[45px] top-3 justify-center lg:justify-end gap-6 items-center w-full ${
              userFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!validName ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                1
              </span>
            ) : (
              <CircleCheck color="grey" />
            )}
            <p
              id="usernote"
              className={
                !validName
                  ? 'dark:text-white text-black w-3/4'
                  : 'text-[#808080] w-3/4'
              }
            >
              يجب أن يتراوح بين 4 إلى 24 حرفًا، ويبدأ دائمًا بحرف، ويقبل بالحروف
              والأرقام والشرطات والشرطات السفلية
            </p>
          </div>

          <div
            className={`enterAnimation1 absolute h-[29px] top-3 lg:top-[4.5rem] justify-center lg:justify-end gap-6 items-center w-full ${
              emailFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!validEmail ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                2
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
            className={`enterAnimation1 justify-center lg:justify-end absolute h-[27px] top-3 lg:top-[8.5rem]  gap-6 items-center w-full ${
              passwordFocus ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {!validPwd ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                3
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
            className={`enterAnimation1 hidden lg:flex justify-center lg:justify-end absolute h-[32px] top-3 lg:top-[13rem]  gap-6 items-center w-full `}
          >
            {!submit ? (
              <span className="w-[24px] h-[24px] px-[6px] pb-[1px] text-center rounded-[50%] dark:border-white border-x-[2px] border-y-[2px] border-black">
                4
              </span>
            ) : (
              <CircleCheck color="grey" />
            )}
            <p
              id="usernote"
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
              !passwordFocus && !userFocus && !emailFocus ? 'flex' : 'hidden'
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
