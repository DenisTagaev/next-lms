import { Suspense } from "react"
import type { Metadata } from "next"

import { Loading } from "@/components/loading"

export const metadata: Metadata = {
  title: "LMS Sign-In",
  description: "Next.js LMS Sign-In provided by Clerk",
};

const AuthLayout = ({
  children,
}: 
  Readonly<React.PropsWithChildren<{}>>
): JSX.Element => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <main className="w-full max-w-lg">
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
};

export default AuthLayout;
