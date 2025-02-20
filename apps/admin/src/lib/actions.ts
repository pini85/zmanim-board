"use server";

import { AuthError } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/Models/User";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export async function signupUser(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // ✅ Validate input
  if (!fullName || !email || !password) {
    throw new Error("כל השדות חובה למילוי");
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("המשתמש כבר קיים");
  }

  // ❌ Don't hash manually, let Mongoose handle it
  const newUser = new User({ fullName, email, password });

  await newUser.save();
  redirect("/");
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Attempting login with:", { email, password });

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Allow manual redirection
    });

    if (result?.error) {
      console.error("Sign-in error:", result.error);
      return result.error;
    }

    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "סיסמה שגויה או שהמשתמש לא נמצא";
        default:
          return "משהו השתבש. נסה שוב.";
      }
    }
    throw error;
  }
}
