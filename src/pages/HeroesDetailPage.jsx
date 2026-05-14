import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_BASE } from '../config'
import './HeroesDetailPage.css'

const ALIGNMENT_COLORS = { good: '#2e7d32', bad: '#c62828', neutral: '#555' }
const STAT_LABELS = {
  intelligence: 'Intelligence', strength: 'Strength', speed: 'Speed',
  durability: 'Durability', power: 'Power', combat: 'Combat',
}

function StatBar({ label, value }) {
  const num = parseInt(value) || 0
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value === 'null' || !value ? '—' : value}</span>
      <div className="stat-bar-bg">
        <div
          className="stat-bar"
          style={{
            width: `${Math.min(100, num)}%`,
            background: num >= 80 ? '#2e7d32' : num >= 50 ? '#f57c00' : '#c62828',
          }}
        />
      </div>
    </div>
  )
}

export default function HeroDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${API_BASE}/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.response !== 'success') throw new Error(d.error || 'Hero not found')
        setHero(d)
        setLoading(false)
      })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [id])

  if (loading) return <div className="detail-loading">Loading…</div>
  if (error) return (
    <div className="detail-error">
      <p>{error}</p>
      <button className="btn" onClick={() => navigate(-1)}>Go back</button>
    </div>
  )

  const alignment = hero.biography?.alignment ?? 'neutral'
  const alignColor = ALIGNMENT_COLORS[alignment] ?? '#555'

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card">
        <div className="detail-hero">
          <div className="detail-img-wrap">
            {hero.image?.url
              ? <img src={hero.image.url} alt={hero.name} className="detail-sprite" />
              : <div className="detail-img-placeholder">?</div>
            }
          </div>
          <div className="detail-meta">
            <h1 className="detail-name">{hero.name}</h1>
            {hero.biography?.['full-name'] && hero.biography['full-name'] !== hero.name && (
              <p className="full-name">{hero.biography['full-name']}</p>
            )}
            <div className="badges">
              {hero.biography?.publisher && (
                <span className="publisher-badge">{hero.biography.publisher}</span>
              )}
              <span className="alignment-badge" style={{ background: alignColor }}>
                {alignment}
              </span>
            </div>
            {hero.biography?.['first-appearance'] && (
              <p className="first-appearance">
                First appearance: <strong>{hero.biography['first-appearance']}</strong>
              </p>
            )}
          </div>
        </div>

        <div className="detail-sections">
          <section>
            <h2>Power Stats</h2>
            <div className="stat-list">
              {Object.entries(STAT_LABELS).map(([key, label]) => (
                <StatBar key={key} label={label} value={hero.powerstats?.[key]} />
              ))}
            </div>
          </section>

          <section>
            <h2>Appearance</h2>
            <div className="info-grid">
              {[
                ['Gender', hero.appearance?.gender],
                ['Race', hero.appearance?.race],
                ['Height', hero.appearance?.height?.[1]],
                ['Weight', hero.appearance?.weight?.[1]],
                ['Eye color', hero.appearance?.['eye-color']],
                ['Hair color', hero.appearance?.['hair-color']],
              ].filter(([, v]) => v && v !== 'null' && v !== '-').map(([label, value]) => (
                <div key={label} className="info-item">
                  <span className="info-label">{label}</span>
                  <span className="info-value">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {hero.biography?.aliases?.length > 0 && hero.biography.aliases[0] !== '-' && (
            <section>
              <h2>Aliases</h2>
              <div className="tag-list">
                {hero.biography.aliases.map(a => (
                  <span key={a} className="tag">{a}</span>
                ))}
              </div>
            </section>
          )}

          {hero.connections?.['group-affiliation'] && hero.connections['group-affiliation'] !== '-' && (
            <section>
              <h2>Group Affiliations</h2>
              <p className="connections-text">{hero.connections['group-affiliation']}</p>
            </section>
          )}

          {hero.work?.occupation && hero.work.occupation !== '-' && (
            <section>
              <h2>Work</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Occupation</span>
                  <span className="info-value">{hero.work.occupation}</span>
                </div>
                {hero.work.base && hero.work.base !== '-' && (
                  <div className="info-item">
                    <span className="info-label">Base</span>
                    <span className="info-value">{hero.work.base}</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
