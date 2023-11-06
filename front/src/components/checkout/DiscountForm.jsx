import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { applyDiscountUtil } from "../../utils/cart/cartUtils";

export default function DiscountForm() {
  const { cart, setCart, discountData, setDiscountData } =
    useContext(CartContext);
  const cartId = cart?.id;
  const discountCode = discountData?.discountCode;
  const validDiscount = discountData?.validDiscount;
  const [discountMessage, setDiscountMessage] = useState(null);
  const handleDiscount = async () => {
    await applyDiscountUtil(
      cartId,
      discountData,
      setDiscountData,
      setCart,
      setDiscountMessage
    );
  };
  return (
    <>
      <div className="discount-form">
        <input
          type="text"
          name="discountCode"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) =>
            setDiscountData((prevData) => ({
              ...prevData,
              discountCode: e.target.value,
            }))
          }
        />
        <button type="button" onClick={handleDiscount}>
          Apply
        </button>
      </div>
      <div className="discount-msg">
        {discountMessage && (
          <p
            className={`display-msg ${
              validDiscount ? "success" : "error-message"
            }`}
          >
            {discountMessage}
          </p>
        )}
      </div>
    </>
  );
}
