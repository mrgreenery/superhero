import { useState, useEffect, useRef } from 'react'
import HeroCard from '../components/HeroCard'
import { API_BASE, TOTAL_HEROES, PAGE_SIZE } from '../config'
import './HeroesPage.css'

export default function HeroesPage() {
  const [page, setPage] = useState(0)
  const [heroes, setHeroes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const inputRef = useRef(null)

  const totalPages = Math.ceil(TOTAL_HEROES / PAGE_SIZE)
  const firstId = page * PAGE_SIZE + 1
  const lastId = Math.min(firstId + PAGE_SIZE - 1, TOTAL_HEROES)
  const ids = Array.from({ length: lastId - firstId + 1 }, (_, i) => firstId + i)

  useEffect(() => {
    if (searchResults !== null) return
    setLoading(true)
    setError(null)
    Promise.all(
      ids.map(id =>
        fetch(`${API_BASE}/${id}`)
          .then(r => r.json())
          .then(d => (d.response === 'success' ? d : null))
          .catch(() => null)
      )
    )
      .then(results => { setHeroes(results.filter(Boolean)); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [page, searchResults])

  function handleSearch(e) {
    e.preventDefault()
    const term = query.trim()
    if (!term) return
    setSearching(true)
    setSearchError(null)
    setSearchResults(null)
    fetch(`${API_BASE}/search/${encodeURIComponent(term)}`)
      .then(r => r.json())
      .then(d => {
        setSearchResults(d.response === 'error' ? [] : d.results)
        setSearching(false)
      })
      .catch(e => { setSearchError(e.message); setSearching(false) })
  }

  function clearSearch() {
    setSearchResults(null)
    setSearchError(null)
    setQuery('')
    inputRef.current?.focus()
  }

  const isSearchMode = searchResults !== null

  return (
    <div>
      <div className="heroes-header">
        <h1>Superhero Browser</h1>
        {!isSearchMode && <span className="total-count">{TOTAL_HEROES} heroes total</span>}
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
        <button className="btn search-btn" type="submit" disabled={searching || !query.trim()}>
          {searching ? 'Searching…' : 'Search'}
        </button>
        {isSearchMode && (
          <button className="btn clear-btn" type="button" onClick={clearSearch}>
            ✕ Clear
          </button>
        )}
      </form>

      {searchError && <p className="error">Search failed: {searchError}</p>}
      {error && <p className="error">Failed to load: {error}</p>}

      {isSearchMode ? (
        <>
          <p className="search-meta">
            {searchResults.length === 0
              ? `No heroes found for "${query}"`
              : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${query}"`}
          </p>
          <div className="grid">
            {searchResults.map(hero => <HeroCard key={hero.id} hero={hero} />)}
          </div>
        </>
      ) : loading ? (
        <div className="grid">{ids.map(id => <div key={id} className="skeleton-card" />)}</div>
      ) : (
        <div className="grid">{heroes.map(hero => <HeroCard key={hero.id} hero={hero} />)}</div>
      )}

      {!isSearchMode && (
        <div className="pagination">
          <button className="btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>← Previous</button>
          <span className="page-info">Page {page + 1} of {totalPages}</span>
          <button className="btn" onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}>Next →</button>
        </div>
      )}
    </div>
  )
}