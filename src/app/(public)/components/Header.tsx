'use client'

import Link from 'next/link'
import { ModeToggle } from '@/components/ui/modetoggle'
import Image from 'next/image';
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
        <div className="flex flex-row w-full gap-10 h-[45px] items-center justify-between px-8 max-w-[1500px] mx-auto">
          <div className='flex flex-row gap-5 items-center'>
            <Image src="/logo.png" alt="logo" width={40} height={40} className="mx-auto" />
          </div>
          <div className='flex flex-row lg:gap-6 gap-3 items-center'>
            <Link href='/auth/login'>
                <span className='font-light hover:font-normal lg:text-md text-sm'>Login</span>
            </Link>
            <ModeToggle/>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;