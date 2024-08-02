"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import DarkMode from "@/app/(service)/settings/appearance//images/darkmode.png";
import LightMode from "@/app/(service)/settings/appearance//images/lightmode.png";
import Image from "next/image";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function ChangeTheme() {
  const { setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const handleApplyChange = () => {
    if (selectedTheme) {
      setTheme(selectedTheme)
    }
  }

  return (
    <>
      <button
        className="border rounded px-3 py-2 text-sm mt-4 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:border-gray-900"
        onClick={() => setIsDrawerOpen(true)}
      >
        <p>Change Theme</p>
      </button>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="flex items-center justify-center">
          <DrawerHeader>
            <DrawerTitle className="font-base font-semibold text-center mb-10 ">
              Update Theme
            </DrawerTitle>
            <div className="flex flex-row gap-10 items-center justify-center">
              <div
                className={`flex items-center justify-center bg-white text-gray-700 rounded border-2 cursor-pointer max-w-sm w-5/12 ${
                  selectedTheme === "light" ? "border-gray-600 dark:border-gray-100" : ""
                } border-4 hover:border-gray-600 border-gray-300 dark:border-gray-400 dark:hover:border-gray-100`}
                onClick={() => setSelectedTheme("light")}
              >
                <Image
                  src={LightMode}
                  alt="lightmode"
                  layout="responsive"
                  className=" rounded"
                  draggable={false}
                />
              </div>
              <div
                className={`flex items-center justify-center bg-black text-gray-300 rounded border-2 cursor-pointer max-w-sm w-5/12 ${
                  selectedTheme === "dark" ? "border-gray-600 dark:border-gray-100" : ""
                } border-4 hover:border-gray-600 border-gray-300 dark:border-gray-400 dark:hover:border-gray-100`}
                onClick={() => setSelectedTheme("dark")}
              >
                <Image
                  src={DarkMode}
                  alt="darkmode"
                  layout="responsive"
                  className=" rounded"
                  draggable={false}
                />
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
                <button
                className="w-full border dark:border-gray-900 rounded px-3 py-2 text-center text-sm my-4 hover:bg-neutral-50 dark:hover:bg-neutral-950"
                onClick={handleApplyChange}
                >
                <p>Apply Change</p>
                </button>
            </DrawerClose>
            {/* <DrawerClose asChild>
              <button
                className="w-full px-2 py-1 text-center font-extralight text-sm mt-2"
                onClick={() => setIsDrawerOpen(false)}
              >
                <p>Cancel</p>
              </button>
            </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
