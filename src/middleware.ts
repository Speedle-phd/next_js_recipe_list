import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJwt } from './lib/jwt'
import { UnauthorizedError } from './lib/errors'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function middleware(request: NextRequest) {
   // console.log(request)
   // console.log(request.nextUrl.pathname)
   // console.log(request.method)

   const requestHeaders = new Headers()
   requestHeaders.set('x-pathname', request.nextUrl.pathname)

   const cookieStore = cookies()
   const authCookie = cookieStore.get('panda-recipes-auth')

   const isAuth = authCookie ? true : false

   // API ROUTE MIDDLEWARE
   if (request.nextUrl.pathname.startsWith("/api") && isAuth){

      const verified = await verifyJwt(authCookie?.value)
      const userEmail = verified.payload.iss
      if (
         userEmail === 'guest@panda-recipes.com'
         
      ) {
         const { statuscode, message } = new UnauthorizedError(
            'Function for guest user not authorized'
         )
         return NextResponse.json({ statuscode, message })
      } else {
         requestHeaders.set('x-userid', verified.payload.id as string)
         return NextResponse.next({headers: requestHeaders})
      }
   } else if (!isAuth && request.nextUrl.pathname.startsWith("/api")){
      return NextResponse.next()
   }

   //PROTECTED AREA MIDDLEWARE
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
   // GUEST USER AUTH
   } else if (!isAuth && request.nextUrl.pathname.startsWith('/login')){
      return NextResponse.next()
   } else {
      let verified;
      if (authCookie?.value) {
         try {
            verified = await verifyJwt(authCookie.value)
         } catch (error) {
            verified = false
         }
         if (verified) {
            requestHeaders.set('x-authorized', authCookie.value)
            requestHeaders.set('x-userid', verified.payload.id)
            requestHeaders.set('x-username', verified.payload.username)
         } else {
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('panda-recipes-auth')
            return response
         }
      }
      if(request.method === "POST" && request.nextUrl.pathname.startsWith('/recipes')){
         const response = NextResponse.next()
         response.headers.set('x-userid', verified.payload.id)
         return response
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
      '/((?!_next/static|_next/image|favicon.ico).*)',
   ],
}
