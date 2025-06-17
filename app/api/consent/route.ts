import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { preference } = await req.json()
  
  const cookieStore = await cookies()
  cookieStore.set('cookie-consent', preference, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 180, // 180 days
    path: '/',
  })
  
  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const consent = cookieStore.get('cookie-consent')
  
  return NextResponse.json({ 
    consent: consent?.value || null 
  })
}