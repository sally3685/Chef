'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import TransportLink from '@/components/transportLink';

const verifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [code, setCode] = useState('');
  const router = useRouter();
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setErrors(undefined);
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <>
      <main className="flex flex-col justify-center items-center  text-[#151517] w-full h-full p-6">
        <h1 className="text-2xl font-bold mb-4"> تاكيد حسابك</h1>
        <form
          onSubmit={handleVerify}
          className="flex flex-col justify-center items-center space-y-4 w-full mb-4"
        >
          <div className="flex flex-col space-y-2 items-start  w-full">
            <label htmlFor="code" id="code">
              ادخل كود تاكيد حسابك{' '}
            </label>
            <input
              className="w-full rounded p-1"
              value={code}
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit" className="w-1/2 rounded p-2 bg-orange-400">
            تاكيد
          </button>
        </form>
        {errors && (
          <ul>
            {errors.map((el, index) => (
              <li key={index}>{el.longMessage}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default verifyEmail;
