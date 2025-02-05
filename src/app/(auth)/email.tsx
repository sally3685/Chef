'use client';

import * as React from 'react';
import { OAuthStrategy } from '@clerk/types';
import { useSignIn } from '@clerk/nextjs';

export default function OauthSignIn() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <>
      <section className="my-10 w-full h-1 flex justify-center items-center">
        <hr className="w-full h-1" />
        <span className="absolute dark:bg-[#151517] bg-white w-20 text-center">
          أو
        </span>
      </section>
      <div className="dark:bg-[#ffffff] bg-[#b25518] text-white dark:text-black text-lg p-3 w-full rounded justify-center items-center flex gap-4">
        <div className="w-[30px] h-[30px] bg-contain bg-center bg-no-repeat bg-[url(/google.svg)]"></div>
        <button onClick={() => signInWith('oauth_google')}>
          استخدام حساب غوغل
        </button>
      </div>
    </>
  );
}
