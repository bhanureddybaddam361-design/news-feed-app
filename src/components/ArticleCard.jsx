import React from 'react'

export default function ArticleCard({ article }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      <div className="h-44 bg-gray-200 dark:bg-gray-700">
        {article.urlToImage ? (
          <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
        )}
      </div>
      <div className="p-3">
        <h2 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-xs mb-2 line-clamp-3">{article.description || article.content || '—'}</p>
        <div className="flex justify-between text-xs">
          <span>{article.source?.name || ''}</span>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="underline">Read</a>
        </div>
      </div>
    </article>
  )
}