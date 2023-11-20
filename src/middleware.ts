import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
   console.log("?")
   const isAuth = false
   if (!isAuth) {
      console.log('hi')
      return NextResponse.redirect(new URL('/', request.url))
   }
   console.log('bye')
   return NextResponse.next()
}

export const config = {
   matcher: ['/about'],
}
