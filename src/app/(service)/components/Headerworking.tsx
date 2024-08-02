"use client"

import * as React from "react"
import { useState, useEffect } from 'react';
import Link from "next/link"
import Image from 'next/link'
import { cn } from "@/lib/utils"
import Logo from "@/app/(service)/assets/logo.png"

import { signout } from '@/lib/auth/actions'
import { ModeToggle } from '@/components/ui/modetoggle'
import { useUsername } from '@/app/(service)/components/ServiceUsernameContext';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
export function AvatarDemo() {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/juyoung-yang-00.png" alt="@username" />
        <AvatarFallback>username</AvatarFallback>
      </Avatar>
    )
}
  

export function NavigationMenuHeader() {
    const { username } = useUsername();
    const [setusername, setUsername] = useState<string | null>(null);

    useEffect(() => {
      if (username) {
        setUsername(username);
      }
    }, [username]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50  max-w-7xl mx-auto bg-white dark:bg-black flex flex-row w-full h-[35px] lg:h-[45px] items-center justify-between"
    >
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger>Box</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                    <NavigationMenuLink asChild>
                    <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-neutral-100 hover:bg-opacity-70 dark:hover:bg-opacity-70 dark:hover:bg-neutral-900"
                        href='/'
                    >
                        < AvatarDemo />
                        <div className="mb-2 mt-4 text-lg font-medium">
                            Dashboard
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                            Analytics and insights.    
                        </p>
                    </a>
                    </NavigationMenuLink>
                </li>
                <ListItem href="/post" title="Post">
                    Make a new post at ease.
                </ListItem>
                <ListItem href={`https://box-jet.vercel.app/${setusername}/`} target="_blank" rel="noopener noreferrer" title="Public Page">
                    Public url for your blog that anyone can access.
                </ListItem>
                <ListItem href="/help" title="Guidelines">
                    How to best use Box.
                </ListItem>
                </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <ListItem href="/manage/postscategories" title="Posts & Categories">
                        Manage your posts and categories.
                    </ListItem>
                    <ListItem href="/manage/profile" title="Profile">
                        Manage your profile information.
                    </ListItem>
                    
                </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/settings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="hover: underline-offset-2"> Settings </p>
                </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
        <div className='flex flex-row items-center'>
            <form>
              <button type="submit" formAction={signout} className='font-extralight hover:font-light hover:underline px-2 py-1 rounded lg:text-md text-sm hidden lg:flex'>Sign out</button>
            </form>
            {/* <div className='-mr-2'>
              <ModeToggle/>
            </div> */}
          </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-neutral-100 hover:bg-opacity-70 dark:hover:bg-opacity-70 dark:hover:bg-neutral-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
