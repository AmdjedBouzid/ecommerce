// middleware.ts (must be in the root of your project)
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("hello --------------------");
  const cookies = request.cookies.getAll();
  const accessToken = request.cookies.get("accessToken")?.value;

  console.log("--- Middleware Cookie Log ---");
  console.log("All Cookies:", cookies);
  console.log("accessToken:", accessToken || "Not Found");
  console.log("------------------------------");

  return NextResponse.next();
}

// Match all routes (excluding _next and static assets)
export const config = {
  matcher: ["/", "/((?!_next|.*\\..*).*)"], // ✅ Best practice
};
