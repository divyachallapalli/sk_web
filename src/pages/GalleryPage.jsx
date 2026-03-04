import { useLocation } from 'react-router-dom'
import Carousel from '../components/carousel.jsx'
import { useData } from '../context/DataContext.jsx'
import { useEffect,  useState } from 'react'
import './GalleryPage.css'

export default function GalleryPage() {
  const location = useLocation()
  const { categories, loading, error } = useData()
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (categories.length > 0) {
      setActive(location.state?.initialTab || categories[0]?.id)
    }
  }, [categories, location.state?.initialTab])

  if (loading) return <main className="gallery-page"><p>Loading...</p></main>
  if (error) return <main className="gallery-page"><p>Error: {error}</p></main>

  return (
    <main className="gallery-page">
      
      <section className="gallery-flex">
        {categories.filter(c=> c.id == active).map(cat=> (
          <Carousel 
            key={cat.id} 
            items={cat.items}
          />
        ))}
      </section>

    </main>
  )
}