import { Link } from "react-router-dom";
import CartSubtotal from "./CartSubtotal";
import { formatPrice } from "../../utils/common/formatPrice";

export default function CartItems({
  cartData,
  currencyCode,
  handleUpdateQuantity,
  handleDelete,
  isCartPage,
  shippingData,
  user,
}) {
  const renderQuantitySelect = (item) =>
    isCartPage && (
      <div>
        Quantity:
        <select
          value={item.quantity}
          onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button onClick={() => handleDelete(item.id)} className="remove-btn">
          Remove
        </button>
      </div>
    );

  const renderSignIn = () =>
    isCartPage &&
    cartData?.items.length > 0 && (
      <div className="cart-sign-in">
        <Link to="/products" className="back-btn">
          &larr; <span>back to store</span>
        </Link>
        {!user && <Link to="/account">sign in</Link>}
      </div>
    );

  const cartItems = cartData?.items?.map((item) => (
    <div key={item.id} className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <ul>
        <li>
          <h3>
            <Link to={`/products/${cartData.items[0].variant.product.id}`}>
              {`${item.title} - ${item.variant.title}`}
            </Link>
          </h3>
        </li>
        <li>{`${item.quantity}x - ${formatPrice(
          item.unit_price * item.quantity,
          currencyCode
        )}`}</li>
        {renderQuantitySelect(item)}
      </ul>
    </div>
  ));
  return (
    <div className="cart-items">
      {renderSignIn()}
      {cartItems}
      <div className="checkout-details-wrapper">
        <CartSubtotal
          cartData={cartData}
          currencyCode={currencyCode}
          isCartPage={isCartPage}
          shippingData={shippingData}
        />
      </div>
      {isCartPage &&
        (cartData?.items.length > 0 ? (
          <Link to="/checkout" className="checkout-btn">
            Go To Checkout
          </Link>
        ) : (
          <div className="empty-cart-text">
            No items in the cart.
            <Link to="/products" className="back-to-store-btn">
              Go To Store
            </Link>
          </div>
        ))}
    </div>
  );
}
