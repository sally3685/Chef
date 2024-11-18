'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import TransportLink from '@/components/transportLink';

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }
    setErrors(undefined);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a form to capture the user's email and password
  return (
    <>
      <main className="flex flex-col justify-center items-center  text-[#151517] w-full h-full p-6">
        <h1 className="text-2xl font-bold mb-4">تسجيل دخول</h1>
        <form
          className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2 items-start  w-full">
            <label htmlFor="email">ادخل البريد الالكتروني</label>
            <input
              autoComplete="email"
              className="w-full rounded p-1"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={email}
            />
          </div>
          <div className="flex flex-col items-start space-y-2 w-full ">
            <label htmlFor="password">ادخل كلمة المرور</label>
            <input
              autoComplete="current-password"
              className="w-full rounded p-1"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              value={password}
            />
          </div>
          <button type="submit" className="w-1/2 rounded p-2 bg-orange-400">
            ارسال
          </button>
        </form>
        {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>{el.longMessage}</li>
            ))}
          </ul>
        )}
        <section className="flex space-x-4 text-sm text-[#292826]">
          <p>ليس لديك حساب ? </p>

          <Link href="/sign-up">انشاء حساب</Link>
        </section>
        <section className="flex space-x-4 text-sm text-[#292826]">
          <p>نسيت كلمة السر ? </p>

          <Link href="/forgot-password">اضفط هنا</Link>
        </section>
      </main>
    </>
  );
}
