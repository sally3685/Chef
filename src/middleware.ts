// import { NextResponse, type NextRequest } from "next/server";
// export function middleware(request: NextRequest) {
//   return NextResponse.rewrite(new URL("/1", request.url));
// }
// export const config = {
//   matcher: "/",
// };
// middleware.ts
import { chain } from './middelwares/chain';
import homeMiddleware from './middelwares/homeMiddleware';
import authMiddleware from './middelwares/authMiddleware';
import { clerkMiddleware } from '@clerk/nextjs/server';
chain([authMiddleware, homeMiddleware]);

export default clerkMiddleware();
// console.log('any');
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
