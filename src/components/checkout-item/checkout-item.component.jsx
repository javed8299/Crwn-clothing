import React from 'react';
import { useContext } from 'react';
import './checkout-item.style.scss';
import { CartContext } from '../../context/cart.context';

const CheckOutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return (
        <di className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={clearItemHandler} className='remove-button'>&#10005;</div>
        </di>
    )
}

export default CheckOutItem;