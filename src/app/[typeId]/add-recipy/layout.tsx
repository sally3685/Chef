import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { connection } from 'next/server'; // [!code ++]
import { Suspense } from 'react'; // [!code ++]
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

async function UTSSR() {
  await connection();
  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <UTSSR />
        {children}
      </Suspense>
    </>
  );
}
