import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mera Wala Meetha - Authentic South Asian Sweets',
  description: 'Find your sweet side with authentic South Asian sweets for celebrations, events, and special occasions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}