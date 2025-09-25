import React from "react";

import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn></SignIn>
    </div>
  );
};

export default Page;
