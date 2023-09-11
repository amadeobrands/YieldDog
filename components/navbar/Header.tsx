'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@lib/utils/cn'

import { WalletConnect } from '@/components/blockchain/WalletConnect'

import logoLight from '@/public/YieldDog.png'

const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the value '50' based on when you want the navbar to change its style
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const classes =cn(
    'fixed top-0 w-full z-[100]',
    'px-6 lg:px-10 py-3 flex items-center justify-between',
    {
      'bg-background/90 backdrop-blur-sm border-b-2 border-muted/20': isScrolled,
      'bg-background': !isScrolled,
    }
  )

  return (
    <header className={classes}>
      {/* Mobile menu container set to hide on screens wider than 1024px */}
      <section className='flex justify-between'>
        <Link href='/'>
          <Image alt='logo' className='w-48' src={logoLight} />
        </Link>
      </section>
      <WalletConnect />
    </header>
  )
} 

export default Header
