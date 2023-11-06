import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { calculateCartUtil } from "../../utils/cart/cartUtils";
import { formatPrice } from "../../utils/common/formatPrice";
export default function CartSubtotal({
  cartData,
  currencyCode,
  isCartPage,
  shippingData,
}) {
  const { discountData } = useContext(CartContext);

  const discountAmount = discountData?.discountAmount;
  const selectedShippingOption = shippingData?.selectedShippingOption;

  const { subtotal, taxes, shipping, total, discount } = calculateCartUtil(
    cartData,
    selectedShippingOption,
    discountAmount
  );

  return subtotal ? (
    <div className="cart-total">
      <ul>
        <li>{`Subtotal: ${formatPrice(subtotal, currencyCode)}`}</li>
        {!isCartPage && (
          <>
            <li>
              {`Shipping:
                  ${formatPrice(shipping, currencyCode)}`}
            </li>
            <li>{`Taxes: ${formatPrice(taxes, currencyCode)}`}</li>
            {discountAmount > 0 && (
              // <li>{`Discount: ${formatPrice(discount, currencyCode)}`}</li>
              <li>{`Discount: -${discountAmount}%`}</li>
            )}
            <li>{`Total: ${formatPrice(total, currencyCode)}`}</li>
          </>
        )}
      </ul>
    </div>
  ) : null;
}
