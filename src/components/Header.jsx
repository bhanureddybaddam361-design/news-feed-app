import React from 'react'

export default function Header({ query, setQuery, dark, setDark }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">📰 News Feed</h1>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="px-3 py-2 rounded-md border focus:ring"
        />
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-2 rounded-md border"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}