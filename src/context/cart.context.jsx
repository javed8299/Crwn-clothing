import { createContext, useState } from 'react';

const addCartItem = (cartItem, productToAdd) => {

    const  existingCartItem = cartItem.find((cartItems) => cartItems.id === productToAdd.id);

    if(existingCartItem) {
        return cartItem.map((cartItems) => cartItems.id === productToAdd.id ? {...cartItems, quantity: cartItems.quantity + 1} : cartItems)
    }

    return [...cartItem, {...productToAdd, quantity: 1}];
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItem: [],
    addItemToCart: () => {}
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItem, setCartItem] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItem, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, cartItem, addItemToCart}

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}