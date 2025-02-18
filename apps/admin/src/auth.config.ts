import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth", // Login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log({ auth });
      console.log({ isLoggedIn });
      const isOnAuthPage = nextUrl.pathname === "/auth";
      const isOnMainPage = nextUrl.pathname.startsWith("/");

      if (isOnMainPage && !isLoggedIn) {
        return false; // Prevent access, middleware will handle redirect
      }

      if (isOnAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl)); // Redirect logged-in users away from login page
      }

      return true; // Allow everything else
    },
  },
  providers: [], // Add providers later
} satisfies NextAuthConfig;
