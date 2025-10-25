import React, { useEffect, useState, useCallback } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ArticleCard from './components/ArticleCard'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const PAGE_SIZE = 12
const CATEGORIES = ['general','technology','sports','business','health','entertainment','science']

function useDebounced(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debounced
}

export default function App() {
  const [articles, setArticles] = useState([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounced(query, 600)
  const [category, setCategory] = useState('general')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const fetchArticles = useCallback(async ({ reset = false, pageToLoad = 1 } = {}) => {
    if (!API_KEY) {
      setError('Missing API key. Add VITE_NEWS_API_KEY in your environment.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const q = debouncedQuery ? `&q=${encodeURIComponent(debouncedQuery)}` : ''
      const cat = category ? `&category=${category}` : ''
      const url = `https://newsapi.org/v2/top-headlines?country=us${cat}${q}&pageSize=${PAGE_SIZE}&page=${pageToLoad}&apiKey=${API_KEY}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.status !== 'ok') throw new Error(data.message || 'Error fetching')
      setTotalResults(data.totalResults)
      setArticles(prev => (reset ? data.articles : [...prev, ...data.articles]))
      setPage(pageToLoad)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, category])

  useEffect(() => {
    setArticles([])
    fetchArticles({ reset: true, pageToLoad: 1 })
  }, [fetchArticles])

  const loadMore = () => fetchArticles({ pageToLoad: page + 1 })

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto p-4">
        <Header query={query} setQuery={setQuery} dark={dark} setDark={setDark} />
        <CategoryFilter category={category} setCategory={setCategory} categories={CATEGORIES} />

        {loading && articles.length === 0 && <p className="text-center py-10">Loading...</p>}
        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-3">{error}</div>}
        {!loading && articles.length === 0 && !error && <p className="text-center py-10">No articles found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a, i) => (<ArticleCard key={i} article={a} />))}
        </div>

        <div className="flex justify-center mt-6">
          {totalResults > articles.length && (
            <button onClick={loadMore} className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">Load More</button>
          )}
        </div>
      </div>
    </div>
  )
}