import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HeroesPage from './pages/HeroesPage'
import HeroDetailPage from './pages/HeroDetailPage'
import AboutPage from './pages/AboutPage'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HeroesPage /> },
      { path: 'hero/:id', element: <HeroDetailPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}