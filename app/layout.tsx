import './globals.css'
import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'

import Header from '@/components/navbar/Header'
import RootProvider from '@/components/providers/RootProvider'


const arimo = Arimo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yield Dog',
  description: 'Maximizing yield on ETH with LSD pools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={arimo.className}>
        <RootProvider>
          <Header />
            {children} 
        </RootProvider>
      </body>
    </html>
  )
}
