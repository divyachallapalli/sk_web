import './Cart.css'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { Link, useSearchParams } from 'react-router-dom'
import { decodeCartData } from '../utils/cartEncoder'
import { useEffect, useState } from 'react'
import { FaPrint } from 'react-icons/fa6'
import { useCart } from '../context/CartContext'

export default function OrderSummary(){
    const [searchParams] = useSearchParams()
    const [orderData, setOrderData] = useState(null)
    const {setCartItems} = useCart()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    
    
    useEffect(() => {
        const encodedData = searchParams.get('data')
        setName(searchParams.get('name') || '')
        setEmail(searchParams.get('email') || '')
        if (encodedData) {
            const decoded = decodeCartData(encodedData)
            setOrderData(decoded)
        }
        setCartItems(orderData ? orderData.items.map(item => ({...item, quantity: item.quantity})) : [])   
    }, [searchParams])

    

   

    if (!orderData) {
        return (
            <main className="cart-page">
                <div className="cart-page-container">
                    <h2>Order not found</h2>
                    <Link to="/gallery" className='backToGallery'><FaChevronCircleLeft size={20}/> Back to Gallery</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="cart-page">
            <div className="cart-page-container">
                <h2>📋 Order Summary</h2>

                <div className="cart-items">
                    <div className="cart-items__product">Product</div>
                    <div className="cart-items__price">Price</div>
                    <div className="cart-items__ctls">Quantity</div>
                </div>

                {orderData.items.map((item, idx) =>
                    <div className="cart-items" key={idx}>
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
                            ₹{(item.quantity * item.price).toFixed(2)}
                        </div>
                        <div className="cart-items__ctls">
                            {item.quantity}
                        </div>
                    </div>
                )}

                <div className='cart-final'>
                    <Link to="/gallery" className='backToGallery'><FaChevronCircleLeft size={20}/> Gallery</Link>
                    <div className="cart-total">
                        <div className="cart-total__label">Total</div>
                        <div className='cart-total__amount'>₹{orderData.total.toFixed(2)}</div>
                    </div>
                </div>

                <div className='share-controls'>
                    <p className='order_name'>Name: {name}</p>
                    <p className='order_email'>Email: {email}</p>
                    <button className='print-cart-btn' onClick={print}>Print Cart<FaPrint size={18}/></button>
                    <p className='order-timestamp'>Order created: {new Date(orderData.timestamp).toLocaleString()}</p>
                </div>
            </div>
        </main>
    )
}
