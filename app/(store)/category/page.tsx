import Link from 'next/link'
import React from 'react'

const categories = [
  { name: "Men's Clothing", href: "/category/men", count: "120+ Items", icon: "👔" },
  { name: "Women's Clothing", href: "/category/women", count: "180+ Items", icon: "👗" },
]

const CategoriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-200">
      {/* Header Section */}
      <div className="border-b border-gray-200 dark:border-zinc-800 pb-5 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          All Categories
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Explore our collection by category to find exactly what you need.
        </p>
      </div>

      {/* Grid Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="
              group relative flex items-center justify-between p-6 
              bg-white dark:bg-zinc-900/70 
              rounded-xl border border-gray-200 dark:border-zinc-800 
              shadow-sm hover:shadow-md 
              hover:border-black dark:hover:border-red-600 
              transition-all duration-200 ease-in-out
            "
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-red-500 transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{item.count}</span>
              </div>
            </div>
            
            {/* Arrow Indicator */}
            <span className="text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage