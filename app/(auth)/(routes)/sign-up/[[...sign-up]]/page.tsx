"use client"

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page(): JSX.Element {
  const { theme } = useTheme();

  return (
    <SignUp
      appearance={{
        baseTheme: theme !== "light" ? dark : undefined,
      }}
    />
  );
}