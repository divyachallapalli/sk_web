import { Link, useLocation } from 'react-router-dom'

export default function Mainnav() {

  const location = useLocation()
  return (
  <nav className="nav">
    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
    <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
  </nav>
  )
}