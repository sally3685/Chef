import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
export const metadata = {
  title: 'أشهى وصفات الطعام',
  description:
    'أكثر من مئة وصفة من مختلف  دول الوطن العربي موضحة بالصور والفيديوهات لجعل رحلتك بصنع الطعام ممتعة وسهلة',
};
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
export default function RootLayout({
  children,
  n,
}: {
  children: React.ReactNode;
  n: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        {/* <link rel="icon" type="image/svg+xml" href="/logo.svg" /> */}
        <body className="min-h-screen dark:bg-zinc-950 bg-stone-100 dark:text-white text-black  before:content:[''] before:w-full before:h-full before:opacity-[5%]  before:bg-[url(/w1.jpg)] before:fixed before:z-[-1] overflow-x-hidden">
          <Header></Header>
          {n}
          {children}
          <Footer></Footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
