import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItem, productToAdd) => {

    const  existingCartItem = cartItem.find((cartItems) => cartItems.id === productToAdd.id);

    if(existingCartItem) {
        return cartItem.map((cartItems) => cartItems.id === productToAdd.id ? {...cartItems, quantity: cartItems.quantity + 1} : cartItems)
    }

    return [...cartItem, {...productToAdd, quantity: 1}];
}

const removecartItem = (cartItem, cartItemToRemove) => {
    const  existingCartItem = cartItem.find((cartItems) => cartItems.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItem.filter(cartItems => cartItems.id !== cartItemToRemove.id)
    }

    return cartItem.map((cartItems) => cartItems.id === cartItemToRemove.id ? {...cartItems, quantity: cartItems.quantity - 1} : cartItems)
}

const clearCartItem = (cartItem, cartItemToClear) => cartItem.filter(cartItems => cartItems.id !== cartItemToClear.id);
    

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItem: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItem.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItem])
    useEffect(() => {
        const newCartTotal = cartItem.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItem])
    

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItem, productToAdd))
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItem(removecartItem(cartItem, cartItemToRemove))
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItem(clearCartItem(cartItem, cartItemToClear))
    }

    const value = { isCartOpen, setIsCartOpen, cartItem, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}