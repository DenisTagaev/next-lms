import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { NextFont } from 'next/dist/compiled/@next/font'
import './globals.css'

import { ToastProvider } from '@/providers/toaster-provider'
import { ConfettiProvider } from '@/providers/confetti-provider'

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
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider/>
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}