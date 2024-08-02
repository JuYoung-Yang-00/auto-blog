'use client'
import Category from '@/app/(service)/manage/postscategories/category';
import PostTable from '@/app/(service)/manage/postscategories/posts';
import PageHead from '@/app/(service)/PageHead'; 

const PostsCategories = () => {

  return (
    <div className='mt-20 max-w-7xl mx-auto dark:text-gray-200'>
        <PageHead />
        <h1 className=' text-2xl border-b mb-2 pb-2 pl-4 dark:border-gray-900'> Posts & Categories </h1>
        <PostTable />

        <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1 max-w-[1400px] mx-auto">
            <div className='w-full lg:col-span-4'>
                <Category />
            </div>
            {/* <div className='w-full lg:col-span-8'>
                <PostTable />
            </div> */}
      </div>
    </div>
  )
}

export default PostsCategories;