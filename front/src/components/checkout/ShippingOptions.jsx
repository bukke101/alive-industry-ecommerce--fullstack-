import { formatPrice } from "../../utils/common/formatPrice";

export default function ShippingForm({
  cart,
  shippingData,
  handleShipping,
  currencyCode,
}) {
  const cartId = cart?.id;

  const shippingForm = shippingData?.options?.map((option) => (
    <div key={option.id} className="shipping-option">
      <input
        type="radio"
        id={`shippingOption-${option.id}`}
        name="shippingOption"
        value={option.id}
        onChange={() => {
          handleShipping(cartId, option.id);
        }}
      />
      <label htmlFor={`shippingOption-${option.id}`}>
        {option.name + " "}
        {formatPrice(option.price_incl_tax, currencyCode)}
      </label>
    </div>
  ));

  return (
    <div className="shipping-options">
      <h3>Shipping Options</h3>
      <form>{shippingForm}</form>
    </div>
  );
}
