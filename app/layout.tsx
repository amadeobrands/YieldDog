import './globals.css'
import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'

import Header from '@/components/navbar/Header'
import { RainbowKit } from '@/components/providers/RainbowKit'


const inter = Arimo({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <RainbowKit>
          <Header />
          <div className='flex flex-col min-h-screen'>
            {children}
          </div> 
        </RainbowKit>
      </body>
    </html>
  )
}
