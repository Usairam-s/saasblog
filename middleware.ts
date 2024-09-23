import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
export default withAuth(async function middleware(req: any) {}, {
  loginPage: "/api/auth/login",
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
