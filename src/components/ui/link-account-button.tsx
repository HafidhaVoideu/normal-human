"use client";
import React from "react";
import { Button } from "./button";
import { getAurinkoAuthUrl } from "@/lib/aurinko";

const LinkAccountButton = () => {
  return (
    <Button
      onClick={async () => {
        const auth = await getAurinkoAuthUrl("Google");
        window.location.href = auth;
      }}
    >
      Link Account
    </Button>
  );
};

export default LinkAccountButton;
