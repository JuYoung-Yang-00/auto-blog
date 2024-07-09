'use client'

import Link from 'next/link'
import { signout } from '@/lib/auth/actions'
import { ModeToggle } from '@/components/ui/modetoggle'
import Image from 'next/image';
import { Hamburger } from '@/app/(service)/components/hamburger';
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
          setHidden(true);
      } else {
          setHidden(false);
      }
      setLastScrollY(currentScrollY); 
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [lastScrollY]);

    return (
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ backdropFilter: 'blur(5px)' }}>
        <div className="flex flex-row w-full gap-10 h-[45px] items-center justify-between px-2 max-w-[1500px] mx-auto">
          <div className='flex flex-row gap-8 items-center'>
            <Image src="/logo.png" alt="logo" width={40} height={40} className="mx-auto mr-5 hidden lg:flex" />
            <div className='lg:hidden'>
              <Hamburger />
            </div>
            <Link href='/'>
                <span className='font-light hover:font-normal lg:text-md text-sm hidden lg:flex'>Dashboard</span>
            </Link>
            <Link href='/profile'>
                <span className='font-light hover:font-normal lg:text-md text-sm hidden lg:flex'>Profile</span>
            </Link>
            <form>
              <button type="submit" formAction={signout} className='font-light hover:font-normal underline px-2 py-1 rounded lg:text-md text-sm hidden lg:flex'>Sign out</button>
            </form>
          </div>
          <div className='flex flex-row items-center'>
            <div className=''>
              <ModeToggle/>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;