import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.SECRET })

  if (session == null) return NextResponse.redirect('/login')
  if (session.role.id != 3) return NextResponse.redirect('/login')
  return NextResponse.next()
}
