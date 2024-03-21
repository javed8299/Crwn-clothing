import React, { useContext } from 'react';
import './checkout.style.scss';
import { CartContext } from '../../context/cart.context';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';

const CheckOut = () => {

    const { cartItem, cartTotal } = useContext(CartContext)

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItem.map((cartItems) => {
                    return <CheckOutItem key={cartItems.id} cartItem={cartItems} />
                })
            }
            <span className='total'>Total : ${cartTotal}</span>
        </div>
    )
}

export default CheckOut;