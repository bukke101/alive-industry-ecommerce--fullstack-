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

  const { subtotal, taxes, shipping, total } = calculateCartUtil(
    cartData,
    selectedShippingOption,
    discountAmount
  );
  const formatCurrency = (value) => formatPrice(value, currencyCode);

  return subtotal ? (
    <div className="cart-total">
      <ul>
        <li>{`Subtotal: ${formatCurrency(subtotal)}`}</li>
        {!isCartPage && (
          <>
            <li>
              {`Shipping:
                  ${formatCurrency(shipping)}`}
            </li>
            <li>{`Taxes: ${formatCurrency(taxes)}`}</li>
            {discountAmount > 0 && <li>{`Discount: -${discountAmount}%`}</li>}
            <br />
            <li>{`Total: ${formatCurrency(total)}`}</li>
          </>
        )}
      </ul>
    </div>
  ) : null;
}
