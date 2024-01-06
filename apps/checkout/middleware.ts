import { NextRequest, NextResponse } from "next/server";

// the list of all allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://micro-frontends-demo.vercel.app",
];

export function middleware(request: NextRequest) {
  // retrieve the current response
  const response = NextResponse.next();

  // retrieve the HTTP "Origin" header
  // from the incoming request
  const origin = request.headers.get("origin") || "";

  // if the origin is an allowed one,
  // add it to the 'Access-Control-Allow-Origin' header
  if (allowedOrigins.includes(origin)) {
    response.headers.append("Access-Control-Allow-Origin", origin);
  }

  // add the remaining CORS headers to the response
  // response.headers.append("Access-Control-Allow-Credentials", "true");
  // response.headers.append(
  //   "Access-Control-Allow-Methods",
  //   "GET,DELETE,PATCH,POST,PUT"
  // );
  // response.headers.append(
  //   "Access-Control-Allow-Headers",
  //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  // );

  return response;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: "/api/:path*",
};
