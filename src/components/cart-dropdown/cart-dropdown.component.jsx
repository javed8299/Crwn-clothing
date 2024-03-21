import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.style.scss';
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {

    const { cartItem } = useContext(CartContext)
    const navigate = useNavigate();

    const goToCheckOut = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItem.map(item => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckOut}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;