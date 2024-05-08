import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    upgrade-insecure-requests;
    default-src 'none';
    base-uri 'none';
    connect-src 'self';
    font-src 'self';
    form-action 'self';
    frame-ancestors 'none';
    img-src 'self';
    manifest-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
      process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
    };
    script-src-attr 'none';
    style-src 'self';
    style-src-attr 'none';
    worker-src 'self';
  `
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  requestHeaders.set('Permissions-Policy', 'interest-cohort=()')

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'interest-cohort=()')

  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
