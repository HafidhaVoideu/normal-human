import Link from "next/link";

import { Button } from "@/components/ui/button";
import LinkAccountButton from "@/components/ui/link-account-button";
export default async function Home() {
  return (
    <div>
      <LinkAccountButton></LinkAccountButton>
    </div>
  );
}
