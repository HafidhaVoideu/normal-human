import { exchangeCodeForUrl, getAccountDetails } from "@/lib/aurinko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ message: "unathorized" }, { status: 401 });

  const params = req.nextUrl.searchParams;

  const status = params.get("status");

  if (status !== "success")
    NextResponse.json({ message: "failed to link account" }, { status: 400 });

  const code = params.get("code");

  if (!code) return NextResponse.json({ message: "no code" }, { status: 400 });
  console.log("userid:", userId);

  const token = await exchangeCodeForUrl(code);

  if (!token)
    return NextResponse.json(
      { message: "failed to exchange code for token" },
      { status: 400 },
    );

  const accountDetails = await getAccountDetails(token.accessToken);

  await db.account.upsert({
    where: {
      id: token.accountId.toString(),
    },
    create: {
      id: token.accountId.toString(),
      userId: userId,
      name: accountDetails.name,
      emailAddress: accountDetails.email,
      accessToken: token.accessToken,
    },
    update: {
      accessToken: token.accessToken,
    },
  });

  console.log("account details:", accountDetails);

  return NextResponse.redirect(new URL("/mail", req.url));
};
