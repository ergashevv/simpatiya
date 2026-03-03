import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simpaty - Premium Ayollar Kiyimlari',
  description: 'Eng so\'nggi va bejirim ayollar liboslari',
}

import { Providers } from './Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
