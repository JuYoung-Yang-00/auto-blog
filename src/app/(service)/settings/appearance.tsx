'use client'
import { ChangeTheme } from '@/app/(service)/settings/appearance/changetheme';
import Image from 'next/image';
import DarkMode from "@/app/(service)/settings/appearance//images/darkmode.png";
import LightMode from "@/app/(service)/settings/appearance//images/lightmode.png";



const Appearance = () => {

  return (
    <div className='max-w-7xl mx-auto'>
        <div className='border-b mb-2 pb-6 md:ml-4 dark:border-gray-900'>
          <h1 className='text-xl font-light'> Appearance </h1>
          <p className='font-light text-gray-500 text-sm dark:text-gray-400'> Customize the appearance of the app. Switch between day and night themes.</p>
        </div>
        <div className='flex flex-col justify-start md:ml-4'>
          <h2 className='font-light mt-4'> Theme </h2>
          <p className='font-extralight text-gray-500 text-sm dark:text-gray-400'> Change between light mode and dark mode. </p>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-8 my-6 max-w-sm w-5/12'>
              <Image src={DarkMode} alt="darkmode" layout='responsive' className='border-4 border-gray-300 dark:border-gray-500 rounded' draggable={false} />
              <Image src={LightMode} alt="lightmode" layout='responsive' className='border-4 border-gray-300 dark:border-gray-500 rounded' draggable={false} />
            </div>
            <div>
              <ChangeTheme />
            </div>
          </div>
            {/* <ChangeTheme /> */}
        </div>



    </div>
  )
}

export default Appearance;


// use drawer for theme change