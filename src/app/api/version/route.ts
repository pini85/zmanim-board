import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensures no caching

export async function GET() {
  console.log("vercel", process.env.VERCEL_BUILD_ID);
  console.log("next", process.env.NEXT_PUBLIC_BUILD_ID);
  const buildId =
    process.env.VERCEL_BUILD_ID ||
    process.env.NEXT_PUBLIC_BUILD_ID ||
    "dev-build";
  return NextResponse.json({ buildId });
}
