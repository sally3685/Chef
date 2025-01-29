import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Providers } from './providers';
export const metadata = {
  title: 'أشهى وصفات الطعام',
  description:
    'أكثر من مئة وصفة من مختلف  دول الوطن العربي موضحة بالصور والفيديوهات لجعل رحلتك بصنع الطعام ممتعة وسهلة',
};
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Post from '@/components/Post';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        {/* <Post/> */}
        {/* <link rel="icon" type="image/svg+xml" href="/logo.svg" /> */}
        <body className="h-[78vh]  dark:bg-zinc-950 bg-stone-100 dark:text-white text-black  before:content:[''] before:w-full before:h-full before:opacity-[5%]  before:bg-[url(/w1.jpg)] before:fixed before:z-[-1] overflow-x-hidden">
          <Providers>
            <Header></Header>
            {children}
            <Footer></Footer>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
