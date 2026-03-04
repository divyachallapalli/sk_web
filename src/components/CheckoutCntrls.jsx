import React from 'react';
import { useCart } from '../context/CartContext';
import { FaPlus ,FaMinus} from 'react-icons/fa6';
import './CheckoutCntrls.css';

export default function CheckoutCntrls({item}){

    const { addToCart, removeFromCart, getCartCountById } = useCart()

    const addItemToCart = (item) => {
        addToCart({
        id: item.id,
        quantity : 0,
        price : item.price,
        thumbnail :item.src,
        description : item.alt
        });
    };

    const removeItemFromCart = (item) => {
        removeFromCart(item.id);
    };


    return (
        <div className="checkout">
          <button className="checkout__remove" onClick={() => removeItemFromCart(item)}><FaMinus size="12px"/></button>
            <div className="checkout__quantity">{getCartCountById(item.id)}</div>
          <button className="checkout__add" onClick={() => addItemToCart(item)}><FaPlus size="12px"/></button>
        </div>
    )
}