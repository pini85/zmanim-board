import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { connectDB } from "./lib/mongodb";
import bcrypt from "bcryptjs";
import User from "./Models/User";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials);

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid input:", parsedCredentials.error);
          throw new Error("Invalid input");
        }

        await connectDB();
        const { email, password } = parsedCredentials.data;
        const user = await User.findOne({ email });

        if (!user) {
          console.log("User not found for email:", email);
          throw new Error("User not found");
        }

        console.log("User found:", user);
        console.log({ password });

        const passwordsMatch = await bcrypt.compare(password, user.password);

        console.log("Entered password:", password);
        console.log("Stored password (hashed):", user.password);
        console.log("Passwords match:", passwordsMatch);

        if (!passwordsMatch) {
          throw new Error("Invalid password");
        }

        // Ensure required user fields are returned
        return {
          id: user._id.toString(),
          name: user.fullName || "User",
          email: user.email,
        };
      },
    }),
  ],
});
