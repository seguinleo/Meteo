import { type NextRequest, NextResponse } from 'next/server'

export default function middleware (request: NextRequest): NextResponse {
  const cspHeader = `
    upgrade-insecure-requests;
    base-uri 'none';
    child-src 'none';
    connect-src 'self';
    font-src 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'none';
    img-src 'self';
    manifest-src 'self';
    media-src 'none';
    object-src 'none';
    script-src-attr 'none';
    style-src 'self';
    style-src-attr 'none';
    style-src-elem 'self';
    worker-src 'self';
  `
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )
  requestHeaders.set('Access-Control-Allow-Origin', 'https://meteo-leoseguin.vercel.app')
  requestHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')
  requestHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin')
  requestHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
  requestHeaders.set('Permissions-Policy', 'camera=(), display-capture=(), fullscreen=(), interest-cohort=(), microphone=(), payment=(), usb=()')
  requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  requestHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('X-FRAME-OPTIONS', 'DENY')

  return NextResponse.next({
    headers: requestHeaders
  })
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
