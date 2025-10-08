import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { MainLayout } from '@/components/main-layout'

const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} flex min-h-screen bg-background` }>
        <MainLayout>

        {children}
        </MainLayout>
        <Analytics />
      </body>
    </html>
  )
}
