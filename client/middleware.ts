import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(process.env.JWT_NAME!)?.value
  console.log(token)
  const allowLoggedOut =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')
  if (allowLoggedOut && token?.length) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (allowLoggedOut) return
  if (!token?.length) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
}
