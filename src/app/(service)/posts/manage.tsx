'use client'
import Category from '@/app/(service)/posts/category';
import PostList from '@/app/(service)/posts/posts';


export function Manage() {

  return (
    <div className='mt-20'>
        <h1 className='font-light text-2xl border-b mb-2 pb-2 pl-4'> Categories & Posts </h1>
        <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1 max-w-[1400px] mx-auto">
            <div className='w-full lg:col-span-4'>
                <Category />
            </div>
            <div className='w-full lg:col-span-8'>
                <PostList />
            </div>
      </div>
    </div>
  )
}
