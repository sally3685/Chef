'use client';
import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
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
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
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
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <main className="flex flex-col justify-center items-center  text-[#151517] w-full h-full p-6">
      <h1 className="text-2xl font-bold mb-4">نسيت كلمة المرور</h1>
      <form
        className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && (
          <>
            <div className="flex flex-col space-y-2 items-start  w-full">
              <label htmlFor="email">ادخل البريد الالكتروني</label>
              <input
                className="w-full rounded p-1"
                type="email"
                placeholder="e.g john@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="w-3/4 rounded p-2 bg-orange-400">
              ارسال كود لتغيير كلمة المرور
            </button>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <div className="flex flex-col items-start space-y-2 w-full ">
              <label htmlFor="password">ادخل كلمة مرور جديدة</label>
              <input
                className="w-full rounded p-1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 w-full ">
              <label htmlFor="password">
                ادخل كود تغيير كلمة المرور الذي ارسل لبريدك الالكتروني
              </label>
              <input
                className="w-full rounded p-1"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button type="submit" className="w-1/2 rounded p-2 bg-orange-400">
              تغيير الكلمة
            </button>
            {error && <p>{error}</p>}
          </>
        )}

        {secondFactor && (
          <p>2FA is required, but this UI does not handle that</p>
        )}
      </form>
    </main>
  );
}
