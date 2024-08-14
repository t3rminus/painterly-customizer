import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'
  ]
};

const middleware = (req) => {
  // Set fake URL header
  const headers = new Headers(req.headers);
  headers.set('x-url', req.url);
  return NextResponse.next({ request: { headers } });
};

export default middleware;