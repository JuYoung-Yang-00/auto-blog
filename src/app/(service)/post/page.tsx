'use client'

import AutoPost from './auto';
import ManualPost from './manual';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PageHead from '@/app/(service)/PageHead'; 

const Post = () => {
  return (
    <div className='mt-20 w-full max-w-7xl mx-auto min-h-screen dark:text-gray-200'>
        <PageHead/>
        <div className='border-b dark:border-gray-900 mb-2 pb-2 pl-4'>
          <h1 className='text-2xl'> New Post </h1>
          {/* <p className='font-extralight text-gray-700'> Select auto or manual to make a new post.</p> */}
        </div>
        <Tabs defaultValue="auto" className="w-full max-w-[1400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2 gap-6">
                <TabsTrigger value="auto" className=" rounded">Auto</TabsTrigger>
                <TabsTrigger value="manual" className=" rounded">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="auto">
                <AutoPost />
            </TabsContent>
            <TabsContent value="manual">
                <ManualPost />
            </TabsContent>
        </Tabs>
    </div>
  )
}


export default Post;