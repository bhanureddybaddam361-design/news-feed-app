import React from 'react'

export default function CategoryFilter({ category, setCategory, categories }) {
  return (
    <nav className="flex gap-2 overflow-x-auto mb-4 pb-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-3 py-1 rounded-full text-sm border ${
            category === cat
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          {cat[0].toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </nav>
  )
}