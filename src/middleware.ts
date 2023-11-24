import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
   const requestHeaders = new Headers()
   requestHeaders.set('x-pathname', request.nextUrl.pathname)

   const cookieStore = cookies()
   console.log(request.nextUrl.pathname)
   const authCookie = cookieStore.get('panda-recipes-auth')

   const isAuth = authCookie ? true : false

   if (
      !isAuth &&
      (!request.nextUrl.pathname.startsWith('/login') &&
         request.nextUrl.pathname !== '/')
   ) {
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
   } else if (isAuth && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname === "/")) {
      const url = new URL('/dashboard', request.url)
      return NextResponse.redirect(url)
   } else {
      if (authCookie?.value) {
         const verified = await jose.jwtVerify(
            authCookie?.value,
            new TextEncoder().encode(process.env.JWT_SECRET)
         )
         if (verified) {
            requestHeaders.set('x-authorized', authCookie.value)
         } else {
            cookieStore.delete('panda-recipes-auth')
            NextResponse.redirect('/login')
         }
      }
      return NextResponse.next({
         request: {
            headers: requestHeaders,
         },
      })
   }
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
   ],
}
