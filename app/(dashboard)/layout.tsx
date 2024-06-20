import dynamic from "next/dynamic";
import { Metadata } from "next";
import { Suspense } from "react";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Loading } from "@/components/loading";
const Footer = dynamic(() =>
  import("@/components/footer").then((res) => res.Footer)
);


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page for the user in the Next.js LMS app created by Denis Tagaev",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <>
      <div className="h-full w-full min-h-screen">
        <nav className="h-[80px] md:pl-52 fixed inset-y-0 w-full z-50">
          <Navbar />
        </nav>
        <aside className="hidden md:flex h-full w-52 flex-col fixed inset-y-0 z-99">
          <Sidebar />
        </aside>
        <main className="md:pl-52 pt-[80px] h-full">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
      <Footer location="dashboard"/>
    </>
  );
}

export default DashboardLayout;