import { useState } from "react";

export const useCart = () => {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if(!cart.find(item => item.id === product.id)){
           setCart([...cart, product]); 
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const clearCart = () => {
        setCart([]);
    }

    return {cart, addToCart, removeFromCart, clearCart}

}