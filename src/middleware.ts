import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(function middleware(req: NextRequest) {
  console.log(req)
}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/") && token === null) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ['/((?!.*login).*)/'],
};
