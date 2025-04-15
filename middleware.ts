import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isLoggedIn = !!token;
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Eğer token yoksa ve login sayfasında değilse -> login'e at
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Eğer token varsa ve login sayfasına gitmeye çalışıyorsa -> anasayfaya at
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'], // sadece korunan yollar ve login
};
