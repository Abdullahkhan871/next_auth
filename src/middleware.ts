import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicPath =
    pathname == "/login" || pathname == "/signup" || pathname == "/verifyemail";

  const token = request.cookies.get("token")?.value;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/myprofile", request.url));
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/myprofile", "/signup", "/verifyemail"],
};
