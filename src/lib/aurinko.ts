"use server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";

export const getAurinkoAuthUrl = async (
  serviceType: "Google" | "Office365",
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("unathorized");

  const params = new URLSearchParams({
    serviceType: serviceType,
    clientId: process.env.AURINKO_CLIENT_ID as string,
    responseType: "code",
    scopes: "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All",
    returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};

export const exchangeCodeForUrl = async (code: string) => {
  try {
    const response = await axios.post(
      `https://api.aurinko.io/v1/auth/token/${code}`,
      {},
      {
        auth: {
          username: process.env.AURINKO_CLIENT_ID as string,
          password: process.env.AURINKO_CLIENT_SECRET as string,
        },
      },
    );
    return response.data as {
      accountId: string;
      accessToken: string;
      userId: string;
      userSession: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error fetching token", error.response?.data);
    } else console.log("unexpected error fetching token: ", error);

    throw error;
  }
};

export const getAccountDetails = async (token: string) => {
  try {
    const response = await axios.get("https://api.aurinko.io/v1/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response data:", response.data);
    return response.data as {
      email: string;
      name: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error fetching account details:", error.response?.data);
    } else console.log("unexpected error fetching account details: ", error);

    throw error;
  }
};
