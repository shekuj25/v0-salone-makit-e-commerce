import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // Routes that require authentication
  const protectedRoutes = ["/merchant", "/admin", "/account", "/checkout", "/my-orders"]

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("sb-access-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login?redirectTo=" + encodeURIComponent(pathname), request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
