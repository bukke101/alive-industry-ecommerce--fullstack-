import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchCartItems } from "../api/fetchCartItems";
import { CartContext } from "../context/CartContext";
import { CountryContext } from "../context/CountryContext";
import { AccountContext } from "../context/AccountContext";
import { deleteUtil, updateQuantityUtil } from "../utils/cart/cartUtils";
import CartItems from "../components/cart/CartItems";
import Loading from "../components/loading/Loading";

export default function Cart() {
  const { cart, updateCart } = useContext(CartContext);
  const { countryData } = useContext(CountryContext);
  const { user } = useContext(AccountContext);
  const currencyCode = countryData?.currencyCode;
  const cartId = cart?.id;
  const results = useQuery(["cart", cartId], () => fetchCartItems(cartId));
  const cartData = results?.data ?? [];
  const [cartMessage, setCartMessage] = useState(null);

  const handleDelete = async (lineItemId) => {
    await deleteUtil(cartId, lineItemId, results, updateCart, setCartMessage);
  };

  const handleUpdateQuantity = async (lineItemId, newQuantity) => {
    await updateQuantityUtil(
      cartId,
      lineItemId,
      newQuantity,
      results,
      updateCart,
      setCartMessage
    );
  };

  return (
    <div className="cart-page">
      <h3>Your Cart</h3>
      {cartMessage && <div className="display-msg">{cartMessage}</div>}
      {results.isLoading ? (
        <Loading />
      ) : results.isError ? (
        <p>Error fetching cart data</p>
      ) : results.data ? (
        <CartItems
          cartData={cartData}
          handleUpdateQuantity={handleUpdateQuantity}
          handleDelete={handleDelete}
          isCartPage={true}
          currencyCode={currencyCode}
          user={user}
        />
      ) : (
        <>
          <p>
            No items in the cart. <Link to="/products">Go to Store</Link>
          </p>
        </>
      )}
    </div>
  );
}
