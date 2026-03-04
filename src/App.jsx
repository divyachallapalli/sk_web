import { Routes, Route, Link } from 'react-router-dom'
import CoverPage from './pages/CoverPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import WishList from './pages/Wishlist.jsx'
import Cart from './pages/Cart.jsx'
import OrderSummary from './pages/OrderSummary.jsx'
import {FaHeart ,FaCartArrowDown,FaBars,FaEyeSlash} from 'react-icons/fa'
import  { useState } from "react";
import  useMediaQuery from './customhooks/useMediaQueres.js'

import './App.css'
import Mainnav from './components/mainnav.jsx';
import { FaXmark } from 'react-icons/fa6';
import { useCart } from './context/CartContext.jsx';

export default function App() {
  
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)'); 
  const { getCartCount } = useCart()

  return (
    <div className="app">
      <header className="app-header">
        <img
          src="/logo.png"
          alt="SK Logo"
          className="logo"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
       {!isMobile && (<Mainnav />) }
        <nav className="checkout-nav">
          <Link to="/wishlist" className="wishlist-link">
           <FaHeart className='icon' size={20} />
          </Link>
          <Link to="/checkout" className="checkout-link">
             <FaCartArrowDown className='icon' size={20} /> 
            <span className="checkout-count">{getCartCount()}</span>
          </Link>
          {isMobile && (<button 
            className="menu-button" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={20} />
          </button>)}
        </nav>

      </header>

      {menuOpen && (
        <div className="side-menu">
          <Mainnav />
          <button className="side-menu-close" onClick={()=> setMenuOpen(false)}> <FaXmark size={20} /></button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>

      <footer className="app-footer">
        <small>© {new Date().getFullYear()} SK Woodcraft</small>
      </footer>
    </div>
  )
}