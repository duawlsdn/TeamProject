import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      // name과 type을 함께 비교하여 중복 항목 확인
      const index = prevItems.findIndex(
        (item) => item.name === newItem.name && item.type === newItem.type
      );
      if (index > -1) {
        const updatedItems = [...prevItems];
        updatedItems[index].quantity += 1;
        return updatedItems;
      }
      const updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
      return updatedItems;
    });
  };

  const updateQuantity = (index, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((_, i) => i !== index);
      }
      const updated = [...prevItems];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((_, i) => i !== index);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  }), [cartItems]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};