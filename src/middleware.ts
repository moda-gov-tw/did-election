import { NextRequest, NextResponse } from "next/server"
import { API_URL, WASM_PROVIDER } from "./constant"

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const unsafeEval = process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${unsafeEval};
    connect-src
      'self'
      data:
      wss://metamask-sdk-socket.metafi.codefi.network
      https://metamask-sdk-socket.metafi.codefi.network
      ${WASM_PROVIDER}
      ${API_URL};
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set(
    "Content-Security-Policy",
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, " ").trim()
  )

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  })
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
}