import { NextRequest, NextResponse } from 'next/server'

export default function middleware (request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    base-uri 'none';
    child-src 'none';
    connect-src 'self';
    frame-ancestors 'none';
    frame-src 'none';
    font-src 'self';
    form-action 'self';
    img-src 'self';
    manifest-src 'self';
    media-src 'none';
    object-src 'none';
    script-src 'self' 'nonce-${nonce}' 'unsafe-eval';
    script-src-attr 'none';
    style-src 'self';
    worker-src 'self';
  `
  const requestHeaders = new Headers()
  requestHeaders.set('Access-Control-Allow-Origin', 'https://meteo-leoseguin.vercel.app')
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\n/g, '')
  )
  requestHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')
  requestHeaders.set('Cross-Origin-Resource-Policy', 'same-origin')
  requestHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
  requestHeaders.set('Permissions-Policy', 'camera=(), display-capture=(), fullscreen=(), interest-cohort=(), microphone=(), payment=(), usb=()')
  requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  requestHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('X-Frame-Options', 'DENY')

  return NextResponse.next({
    headers: requestHeaders
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
