import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname === "/auth";
      const isOnProtectedPage = !isOnAuthPage;

      if (isOnProtectedPage && !isLoggedIn) {
        console.log("Redirecting to login page");
        return NextResponse.redirect(new URL("/auth", nextUrl.origin));
      }

      if (isOnAuthPage && isLoggedIn) {
        console.log("Redirecting to home page");
        return NextResponse.redirect(new URL("/", nextUrl.origin));
      }

      return NextResponse.next();
    },
  },
  providers: [], // Add providers later
} satisfies NextAuthConfig;
