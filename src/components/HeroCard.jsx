import { useNavigate } from 'react-router-dom'
import './HeroCard.css'

const ALIGNMENT_COLORS = { good: '#2e7d32', bad: '#c62828', neutral: '#555' }

export default function HeroCard({ hero }) {
  const navigate = useNavigate()
  const alignment = hero.biography?.alignment ?? 'neutral'

  return (
    <button className="hero-card" onClick={() => navigate(`/hero/${hero.id}`)}>
      <div className="hero-img-wrap">
        {hero.images?.md
          ? <img src={hero.images.md} alt={hero.name} loading="lazy" />
          : <div className="hero-img-placeholder">?</div>
        }
      </div>
      <div className="hero-card-body">
        <span className="hero-name">{hero.name}</span>
        <span className="hero-publisher">{hero.biography?.publisher || 'Unknown'}</span>
        <span className="alignment-dot" style={{ background: ALIGNMENT_COLORS[alignment] ?? '#555' }}>
          {alignment}
        </span>
      </div>
    </button>
  )
}