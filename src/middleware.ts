import { getToken } from "next-auth/jwt";
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: "/",
  },
});

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Redirect if user is already logged in
  if (
    (pathname === "/" && token?.email) ||
    (pathname === "/register" && token?.email)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/tasks";
    return NextResponse.redirect(url);
  }

  return authMiddleware(
    req as NextRequestWithAuth,
    {} as unknown as NextFetchEvent,
  );
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
