import { createContext, useContext, useState } from 'react'



const CartContext = createContext()

export default function CartProvider({ children}) {
    const [cart, setCart] = useState([])


    function addToCart(item) {
       setCart(prevCart => {
        const existingItem = prevCart.find(i => i.id === item.id)
        if(existingItem){
            return prevCart.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i)
        }else{
            return [...prevCart, {...item, quantity: 1}]
        }
       })
    }

    function removeFromCart(itemId) {
       setCart(prevCart => {
        const existingItem = prevCart.find(i => i.id === itemId)
        if(existingItem && existingItem.quantity === 1){
            return prevCart.filter(i => i.id !== itemId)
        }else if(existingItem){
            return prevCart.map(i => i.id === itemId ? {...i, quantity: i.quantity - 1} : i)
        }else{
            return prevCart
        }
       })
    }

    function clearCart() {
        setCart([])
    }

    function setCartItems(items) {
        setCart(items)
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    function getCartCount() {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    function getCartCountById(itemId) {
        return cart.find(item => item.id === itemId)?.quantity || 0
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount,getCartCountById,setCartItems}}>
         {children}
        </CartContext.Provider>
       )
}

export function useCart() {
    const context = useContext(CartContext)
    if(!context){
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
 }

