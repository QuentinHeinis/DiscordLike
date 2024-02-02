import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/friends/:path*", 
    "/profile/:path*", 
    "/settings/:path*", 
    "/messages/:path*",
    "/servers/:path*",
  ],
};
