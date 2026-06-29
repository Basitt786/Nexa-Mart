import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='px-4 md:px-10 mt-4'>
        <h1 className="text-2xl md:text-3xl font-medium">All Categories :</h1>
    </div>

     <div className='flex border-2 border-gray-600 rounded-lg ml-4 gap-4 px-4 py-2'>
         <div className="list-disc list-inside mt-4 text-lg ">
          <div className="text-red-600 font-semibold">

            <Link href="/category/men" className="hover:underline">Men's Clothing
            
            </Link>
          </div>
          <div className="text-red-600 font-semibold">
            <Link href="/category/women" className="hover:underline">Women's Clothing</Link>
          </div>
        </div>
        </div>
    
    </>    
  )
}

export default page

