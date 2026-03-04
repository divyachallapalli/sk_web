import './Cart.css'
import { useState } from 'react'
import {useCart} from "../context/CartContext"
import { FaXmark,FaPrint } from 'react-icons/fa6' 
import CheckoutCntrls from '../components/CheckoutCntrls'
import { FaChevronCircleLeft,FaCopy, FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { encodeCartData, generateShareableLink,formatCartForWhatsapp } from '../utils/cartEncoder'

export default function Cart(){
    const {cart,removeFromCart,getCartTotal,getCartCountById}=useCart()
    const [copied, setCopied] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [errors, setErrors] = useState({ name: '', email: '' })

    const validateForm = () => {
        const newErrors = { name: '', email: '' }
        let isValid = true

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
            isValid = false
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
            isValid = false
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

       const sendViaWhatsapp = () => {
        if (!validateForm()) return
        if (!cart) return
        const phoneNumber = '918121213090'
        const message =formatCartForWhatsapp(cart, getCartTotal(), generateShareableLink(window.location.origin, encodeCartData(cart, getCartTotal()),formData.name,formData.email),formData)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const handleCopyLink = () => {
        if (!validateForm()) return
        navigator.clipboard.writeText(generateShareableLink(window.location.origin, encodeCartData(cart, getCartTotal()),formData.name,formData.email))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="cart-page">
            <div className="cart-page-container">

                {cart.length==0 && <><h2>Your cart is empty</h2></>}

                {cart.length>0 && <div className="cart-items">
                    <div className="cart-items__product">Product</div>
                    <div className="cart-items__price">Price</div>
                    <div className="cart-items__ctls">Quantity</div>
                </div>}

                {cart.map(item =>
                    <div className="cart-items">
                     <div className="cart-items__product">
                      <div className='cart-img-thumnail'>
                          <img src={item.thumbnail} alt=""/>
                        </div>
                        <div className="cart-items__desc">
                          <div className="item-id">{item.id}</div>
                          <div className="item-desc">
                            {item.description}
                          </div>
                        </div>
                        
                     </div>
                      <div className="cart-items__price">
                        ₹{(getCartCountById(item.id) * item.price).toFixed(2)}
                      </div>

                      <div className="cart-items__ctls">
                        <CheckoutCntrls item={item}/>
                      </div>
                      <div className="remove-item" onClick={() => removeFromCart(item.id)}>
                        <FaXmark size={20}/>
                      </div> 
                    </div>
                   
                )}

               { cart.length >0 && 
                
                <>
                   <div className='cart-final'>
                      <Link to="/gallery" className='backToGallery'><FaChevronCircleLeft size={20}/> Gallery</Link>
                      <div className="cart-total">
                          <div className="cart-total__label">Total</div>
                          <div className='cart-total__amount'>₹{getCartTotal().toFixed(2)}</div> 
                      </div>
                    </div>

                    <div className='confirm__label'>Confirm your order</div>
                    <div className='confirm_form'>
                      <label htmlFor="name">Name</label>
                      <div className='form-group'>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          placeholder='Enter your name' 
                          value={formData.name}
                          onChange={handleInputChange}
                          className={errors.name ? 'error' : ''}
                          required
                        />
                        {errors.name && <span className='error-message'>{errors.name}</span>}
                      </div>
                      <label htmlFor="email">Email</label>
                      <div className='form-group'>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          placeholder='Enter your email' 
                          value={formData.email}
                          onChange={handleInputChange}
                          className={errors.email ? 'error' : ''}
                          required
                        />
                        {errors.email && <span className='error-message'>{errors.email}</span>}
                      </div>
                      <div className='cart_actions'>
                         <button className='copy-link-btn' onClick={handleCopyLink}>
                                                {copied ? <FaCheck size={18}/> : <FaCopy size={18}/>}
                                                {copied ? 'Link Copied!' : 'Copy Link'}
                                            </button>
                        <button className='print-cart-btn' onClick={print}><FaPrint size={18}/>Print Cart</button>
                        <button className='confirm_via_whatsApp' onClick={sendViaWhatsapp}><img src='images/whatsapp.png' alt="whatsapp logo"/>Confirm</button>
                      </div>
                    </div>
                </>
               }

            
            </div>
        </main>
    )
}