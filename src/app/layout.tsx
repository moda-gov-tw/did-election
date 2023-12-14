import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { headers } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "數位社會民意代表選舉",
  description: "數位社會民意代表選舉"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get("x-nonce")
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
