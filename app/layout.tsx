import './globals.css'
import type { Metadata } from "next"
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "Mera Wala Meetha - South Asian Sweet Marketplace",
  description: "2-sided marketplace for bulk ordering of sweets for South Asian occasions like marriages, anniversaries and religious festivities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}