import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export function Footer({
    location,
}: Readonly<{ location: "dashboard" | "course" }>) {
  return (
    <footer className={`${ location === "dashboard" ? 'md:pl-52' : 'md:pl-80'} z-50 overflow-hidden`}>
      <Card className="mx-auto px-6 py-2 rounded-none">
        <CardHeader className="flex flex-col items-center justify-between md:flex-row p-0">
          <div className="text-center md:text-left p-2">
            <p className="text-sm mt-2">
              Built with{" "}
              <Link
                href="https://nextjs.org"
                className="underline hover:text-sky-600"
                aria-label="nextjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js,
              </Link>{" "}
              <Link
                href="https://ui.shadcn.com/"
                className="underline hover:text-sky-600"
                aria-label="ui.chadcn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shadcn/ui,
              </Link>{" "}
              and{" "}
              <Link
                href="https://tailwindcss.com"
                className="underline hover:text-sky-600"
                aria-label="Tailwindcss"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tailwind CSS
              </Link>
              .
            </p>
            <p className="text-sm pt-1 italic">
              © 2024 Denis Tagaev. All rights reserved.
            </p>
          </div>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link
              href="https://github.com/DenisTagaev"
              aria-label="GitHub"
              className="hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </Link>
            <Link
              href="https://www.linkedin.com/in/denis-tagaev-work/"
              aria-label="LinkedIn"
              className="hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </Link>
            <Link
              href="mailto:denis.tagaev.work@gmail.com"
              aria-label="Email"
              className="hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Mail />
            </Link>
            <Link
              href="https://t.me/Denis_Tagaev"
              aria-label="Telegram"
              className="hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send />
            </Link>
          </div>
        </CardHeader>
        <Separator className="my-2 w-[85%] mx-auto" />
        <CardFooter className="text-center md:text-left p-0">
          <p className="text-sm text-slate-400 dark:text-slate-600">
            Special thanks for inspiration to{" "}
            <Link
              href="https://www.youtube.com/@codewithantonio"
              aria-label="YouTube"
              className="underline hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Antonio
            </Link>{" "}
            . This website is a clone with extended functionality, updated
            packages as of June 2024, and enhanced performance, stability, and
            SEO.
          </p>
        </CardFooter>
      </Card>
    </footer>
  );
}
