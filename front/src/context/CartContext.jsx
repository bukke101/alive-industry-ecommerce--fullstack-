import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [discountData, setDiscountData] = useState({
    discountCode: "",
    discountAmount: 0,
    validDiscount: false,
  });
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        discountData,
        setDiscountData,
        updateCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
