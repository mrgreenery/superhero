import { useState, useEffect, useRef, useMemo } from 'react'
import HeroCard from '../components/HeroCard'
import { API_BASE, PAGE_SIZE } from '../config'
import './HeroesPage.css'

export default function HeroesPage() {
  const [allHeroes, setAllHeroes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/all.json`)
      .then(r => { if (!r.ok) throw new Error('Failed to load heroes'); return r.json() })
      .then(data => { setAllHeroes(data); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    const q = activeQuery.trim().toLowerCase()
    if (!q) return allHeroes
    return allHeroes.filter(h => h.name.toLowerCase().includes(q))
  }, [allHeroes, activeQuery])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageHeroes = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const isSearchMode = activeQuery.trim() !== ''

  function handleSearch(e) {
    e.preventDefault()
    setActiveQuery(query)
    setPage(0)
  }

  function clearSearch() {
    setQuery('')
    setActiveQuery('')
    setPage(0)
    inputRef.current?.focus()
  }

  return (
    <div>
      <div className="heroes-header">
        <h1>Superhero Browser</h1>
        {!loading && <span className="total-count">{allHeroes.length} heroes total</span>}
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          ref={inputRef}
          className="search-input"
          type="search"
          placeholder="Search heroes by name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="btn search-btn" type="submit" disabled={loading || !query.trim()}>
          Search
        </button>
        {isSearchMode && (
          <button className="btn clear-btn" type="button" onClick={clearSearch}>
            ✕ Clear
          </button>
        )}
      </form>

      {error && <p className="error">Failed to load: {error}</p>}

      {isSearchMode && !loading && (
        <p className="search-meta">
          {filtered.length === 0
            ? `No heroes found for "${activeQuery}"`
            : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${activeQuery}"`}
        </p>
      )}

      {loading ? (
        <div className="grid">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : (
        <div className="grid">
          {pageHeroes.map(hero => <HeroCard key={hero.id} hero={hero} />)}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button className="btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>← Previous</button>
          <span className="page-info">Page {page + 1} of {totalPages}</span>
          <button className="btn" onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}>Next →</button>
        </div>
      )}
    </div>
  )
}