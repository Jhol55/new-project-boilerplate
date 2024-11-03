import { NextRequest, NextResponse } from "next/server";
import { sessionService } from "@/services/session";

export async function middleware(request: NextRequest) {
  const session = await sessionService.getSession();
  const response = await sessionService.updateSession(request);
  const path = request.nextUrl.pathname;

  if (!session && path !== "/") return NextResponse.redirect(new URL("/", request.url));
  if (session && path === "/") return NextResponse.redirect(new URL("/index", request.url));
  if (response) return response;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|/$|register|confirm).*)",
  ],
};
