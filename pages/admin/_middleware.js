import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.SECRET })
  if (session.role.id != 4) return NextResponse.redirect('/login')

  return NextResponse.next()
}
