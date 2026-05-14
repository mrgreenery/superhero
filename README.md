# Superhero Browser

A React web application that lets you browse and explore a catalog of superheroes — built as an alternative to the WEB2 Pokédex assignment. Instead of Pokémon, this app uses the [Superhero API](https://akabab.github.io/superhero-api/api/) to display detailed information about 563 heroes and villains from comics, movies, and TV.

🔗 **Live demo:** [mrgreenery.github.io/superhero](https://mrgreenery.github.io/superhero/)

---

## Features

- Browse all heroes with paginated list view (20 per page)
- Search heroes by name (client-side, instant results)
- Click any hero to view detailed information:
  - Power stats with visual bar chart
  - Appearance, biography, work, and connections
- About page describing the tech stack
- Fully responsive layout

---

## Assignment Requirements

This project fulfills all requirements of the WEB2 Assignment 2:

| Requirement | Implementation |
|---|---|
| External Web API | [akabab Superhero API](https://akabab.github.io/superhero-api/api/) |
| Paginated list | Previous / Next buttons, 20 heroes per page |
| Detailed view | Hero detail page with stats, abilities, appearance |
| Multiple pages + React Router | Heroes, Hero Detail, About — using `createHashRouter` |
| Vite | Yes |
| Deployed | GitHub Pages via GitHub Actions |

---

## Tech Stack

- [React 18](https://react.dev/)
- [React Router 6](https://reactrouter.com/) — client-side routing with `createHashRouter`
- [Vite](https://vite.dev/) — build tool and dev server
- Deployed via [GitHub Pages](https://pages.github.com/) using GitHub Actions

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
  App.jsx                  # Router setup
  components/
    Layout.jsx / .css      # Sticky header and navigation
    HeroCard.jsx / .css    # Hero grid card
  pages/
    HeroesPage.jsx / .css  # Paginated list with search
    HeroesDetailPage.jsx   # Stats, bio, appearance
    AboutPage.jsx / .css   # Tech stack info
  config.js                # API base URL
  main.jsx                 # Entry point
```

---

## API

Data is sourced from the open [akabab Superhero API](https://akabab.github.io/superhero-api/api/), which serves 563 heroes as static JSON hosted on GitHub Pages. No API key required.
