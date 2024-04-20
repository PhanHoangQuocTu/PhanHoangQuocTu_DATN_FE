import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return response;
}

export const removeToken = (response: NextResponse) => {
  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|images|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.webmanifest$).*)'],
};
