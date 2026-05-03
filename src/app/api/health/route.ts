import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
   try {
      // Simple health check - could add database connectivity check here
      return NextResponse.json(
         {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
         },
         { status: 200 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            status: 'unhealthy',
            error: 'Service unavailable',
         },
         { status: 503 },
      )
   }
}
