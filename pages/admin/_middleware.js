import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.SECRET })

  if (!session) return NextResponse.redirect('/login')

  return NextResponse.next()
}
