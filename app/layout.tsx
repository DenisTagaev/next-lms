import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { NextFont } from 'next/dist/compiled/@next/font'
import './globals.css'

import { ToastProvider } from '@/providers/toaster-provider'
import { ConfettiProvider } from '@/providers/confetti-provider'
import { ThemeProvider } from "@/providers/theme-provider"

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Next LMS',
  description: 'Next.js LMS project created by Denis Tagaev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ConfettiProvider/>
          <ToastProvider/>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="color-schema"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}