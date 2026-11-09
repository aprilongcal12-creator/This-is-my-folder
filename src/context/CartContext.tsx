import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  cartItems: number;
  addToCart: () => void;
  removeFromCart: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const removeFromCart = () => {
    setCartItems(prev => Math.max(0, prev - 1));
  };

  const clearCart = () => {
    setCartItems(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}