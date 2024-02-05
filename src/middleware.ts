import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export default function middleware(req: NextRequest, res : NextResponse)  {
    const token : string|undefined =        req.cookies.get("accessToken")?.value &&
        req.cookies.get("refreshToken")?.value
    
    const loggedInUserNotAccessPath = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register"

    if(loggedInUserNotAccessPath && token) {
        return NextResponse.redirect(new URL("/welcome", req.url))
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/welcome/:path*'],
  }