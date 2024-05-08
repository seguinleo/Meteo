import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
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
      script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline';
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
  
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    response.headers.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
    )
  
    return response
  }
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
