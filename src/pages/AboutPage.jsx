import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About</h1>
      <div className="about-card">
        <img src="/YOUR_REPO_NAME/hero.svg" alt="Hero" width={80} height={80} />
        <h2>Superhero Browser</h2>
        <p>
          Browse 731 superheroes and villains from Marvel, DC, and beyond.
          View power stats, appearance, biography, and group affiliations —
          all powered by the <a href="https://superheroapi.com/" target="_blank" rel="noreferrer">Superhero API</a>.
        </p>
        <ul className="feature-list">
          <li>Browse all 731 heroes with pagination</li>
          <li>Power stats with visual bar charts</li>
          <li>Biography, appearance, and affiliations</li>
          <li>Good / bad / neutral alignment indicators</li>
        </ul>
        <div className="tech-stack">
          <span>React 18</span>
          <span>React Router 6</span>
          <span>Vite</span>
          <span>Superhero API</span>
        </div>
      </div>
    </div>
  )
}