import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext.jsx'
import './CoverPage.css'
import useMediaQuery from '../customhooks/useMediaQueres.js'
import ImageSwiper from '../components/ImageSwiper.jsx'

export default function CoverPage({menuOpen}) {
  const navigate = useNavigate()
  const { categories, loading, error } = useData()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (loading) return <main className="cover-page"><p>Loading...</p></main>
  if (error) return <main className="cover-page"><p>Error: {error}</p></main>

  return (
    <main className="cover-page">
      {menuOpen && (
        <section className="side-menu">
        </section>
      )}

      {/* { !isMobile && ( */}
            <div className="hero-swiper-image">
             <ImageSwiper />
            </div>
        {/* )} */}
        
      <section className="hero">
        <div className="hero-text">
          <h1>Crafted in Wood, Cherished Forever</h1>
          <p>Explore timeless mementos, gift articles, and bespoke wedding cards.</p>
        </div>
        
        
      </section>

      <section className="category-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="category-card"
            onClick={() => navigate('/gallery', { state: { initialTab: cat.id } } )}
            aria-label={`Open ${cat.name} gallery`}
          >
            <div className="card-media">
              {/* Fallback color block if image not available */}
              {cat.cover ? (
                <img src={cat.cover} alt={cat.name} />
              ) : (
                <div className="cover-fallback" />
              )}
            </div>
            <div className="card-info">
              <h3>{cat.name}</h3>
              <p>{cat.tagline}</p>
            </div>
          </button>
        ))}
      </section>
    </main>
  )
}