"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
      {
        // Light mode styles
        "bg-white data-[state=unchecked]:bg-gray-200 data-[state=checked]:bg-gray-900": !document.documentElement.classList.contains('dark'),
        // Dark mode styles
        "bg-black data-[state=unchecked]:bg-zinc-500 data-[state=checked]:bg-gray-200": document.documentElement.classList.contains('dark'),
      }
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform",
        {
          "bg-white data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5": !document.documentElement.classList.contains('dark'),
          "bg-black data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5": document.documentElement.classList.contains('dark'),
        }
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = "Switch"

export { Switch }

