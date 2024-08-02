'use client'
import PageHead from '@/app/(service)/PageHead'; 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Appearance from '@/app/(service)/settings/appearance';
import Profile from '@/app/(service)/settings/profile';

const Settings = () => {

  return (
    <div className='mt-20 max-w-7xl mx-auto min-h-screen border rounded p-4 dark:border-gray-900 dark:text-gray-200'>
        <PageHead />
        <div className='border-b mb-2 pb-6 md:pl-4 dark:border-gray-900 '>
          <h1 className='text-2xl'> Settings </h1>
          <p className='font-light text-gray-500 dark:text-gray-400'> Manage your account settings and set preferences.</p>
        </div>

        <div className='w-full my-8'>
          <Tabs defaultValue="profile" className="w-full grid md:grid-cols-12 grid-cols-2 gap-4">
              <TabsList className="col-span-2 flex md:flex-col md:mt-4 flex-row gap-2 self-center h-full justify-start">
                <TabsTrigger value="profile" className="rounded md:w-full justify-start">Profile</TabsTrigger>
                  <TabsTrigger value="appearance" className="rounded md:w-full justify-start">Appearance</TabsTrigger>
              </TabsList>
              <div className='col-span-10 '>
                <TabsContent value="profile">
                    <Profile />
                </TabsContent>
                <TabsContent value="appearance">
                  <Appearance />
                </TabsContent>
              </div>
          </Tabs>
        </div>


    </div>
  )
}

export default Settings;