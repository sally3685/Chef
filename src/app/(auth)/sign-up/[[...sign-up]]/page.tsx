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
import { useRef, useState } from 'react';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useEffect } from 'react';
export default function Page() {
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passdwordRef = useRef<HTMLInputElement>(null);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [submit, setsubmit] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);

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
        console.log(err);
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
      <main className="flex flex-col justify-center items-center   w-full h-full p-6">
        <h1 className="text-xl font-medium mb-4"> انشاء حساب</h1>
        {submit && <h2>يتم متابعة الطلب الرجاء الانتظار ...</h2>}
        <form
          className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2 items-start  w-full">
            <label
              htmlFor="username"
              className="flex text-sm space-x-3 justify-center items-center "
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
                  errorsUsername || firstSubmit === false ? 'hidden' : 'block'
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
              className=" w-full rounded p-[2px] text-[#151517]"
              id="username"
              type="text"
              name="username"
              ref={userRef}
              value={username}
              required
              aria-invalid={errorsUsername ? 'false' : 'true'}
              aria-errormessage="username-error"
              onChange={(e) => setUsername(e.target.value)}
              // aria-describedby="uidnote"
              // onFocus={() => setUserFocus(true)}
              // onBlur={() => setUserFocus(false)}
            />
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
                errorsUsername ? 'block text-xs text-red-600' : 'hidden'
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
          <div className="flex flex-col space-y-2 items-start  w-full">
            <label
              htmlFor="email"
              className="flex space-x-3 justify-center items-center text-sm"
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
                className={
                  errorsEmail || firstSubmit === false ? 'hidden' : 'block'
                }
              />
              <CirclePlus
                color="red"
                style={{ transform: 'rotate(45deg)' }}
                className={errorsEmail ? 'block' : 'hidden'}
              />
            </label>
            <input
              ref={emailRef}
              className="w-full !rounded text-[#151517] p-[2px]"
              id="email"
              type="email"
              name="email"
              value={emailAddress}
              required
              aria-invalid={errorsEmail ? 'false' : 'true'}
              aria-errormessage="email-error"
              onChange={(e) => setEmailAddress(e.target.value)}
              // onFocus={() => setEmailFocus(true)}
              // onBlur={() => setEmailFocus(false)}
            />
            <div
              id="email-error"
              aria-live="assertive"
              className={errorsEmail ? 'block text-xs text-red-600' : 'hidden'}
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
          <div className="flex flex-col items-start space-y-2 w-full ">
            <label
              htmlFor="password"
              className="flex space-x-3 text-sm justify-center items-center "
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
                className={
                  errorsPassword || firstSubmit === false ? 'hidden' : 'block'
                }
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
              className="w-full rounded !text-[#151517]  p-[2px]"
              id="password"
              type="password"
              name="password"
              value={password}
              required
              aria-invalid={errorsPassword ? 'false' : 'true'}
              aria-errormessage="password-error"
              onChange={(e) => setPassword(e.target.value)}
              // onFocus={() => setPasswordFocus(true)}
              // onBlur={() => setPasswordFocus(false)}
            />
            <div
              id="password-error"
              aria-live="assertive"
              className={
                errorsPassword ? 'block text-xs text-red-600' : 'hidden'
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

          <button
            type="submit"
            disabled={submit ? true : false}
            className="w-1/2 rounded p-[4px] bg-orange-400"
          >
            متابعة
          </button>
        </form>
        {/* <button type="button" aria-label="Show password">
  <div class="eye-icon">
</button> 

  Show a loading state to the user
*/}

        <section className="flex space-x-4 text-sm text-[#d8d8d8]">
          <p> لديك حساب مسبقا ? </p>
          <Link href="/sign-in"> تسجيل دخول</Link>
        </section>
      </main>
    </>
  );
}
