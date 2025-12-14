import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // 🏠 Root route ("/")
  // if (request.nextUrl.pathname === "/") {
  //   // Redirect to Operators View
  //   return NextResponse.redirect(new URL("/operator", request.url));
  // }

  // Otherwise, allow request
  return NextResponse.next();
}
