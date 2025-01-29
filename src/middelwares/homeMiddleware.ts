import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { CustomMiddleware } from './chain';
// import { clerkMiddleware } from '@clerk/nextjs/server';

export default function homeMiddleware(
  middleware: CustomMiddleware
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // if (request.url === 'http://localhost:3000/') {
    //   return NextResponse.rewrite(new URL('/1', request.url));
    // }
    // clerkMiddleware();
    return middleware(request, event, response);
  };
}
