import { formatPrice } from "../../utils/common/formatPrice";
export default function OrderDetails({
  selectedOrder,
  setSelectedOrder,
  countryData,
}) {
  const {
    items,
    display_id,
    fulfillment_status,
    payment_status,
    subtotal,
    discount_total,
    shipping_total,
    tax_total,
    total,
    customer,
    shipping_address,
    payments,
  } = selectedOrder || {};

  const orderSummary = items?.map((item) => (
    <div key={item.id}>
      <img src={item.thumbnail} width="200px" />
      <h3>{`${item.title} - ${item.variant.title} x${item.quantity}`}</h3>
    </div>
  ));
  const formatCurrency = (value) =>
    formatPrice(value, countryData?.currencyCode);
  return (
    <div className="customer-order">
      <div className="customer-order-top">
        <h3>{`Order: #${display_id}`}</h3>
        <p>{`fullfilment: ${fulfillment_status}`}</p>
        <p>{`payment status: ${payment_status}`}</p>
        <a onClick={() => setSelectedOrder(null)}>
          <i className="fa fa-times" aria-hidden="true" />
        </a>
      </div>
      <div className="order-summary">
        <div>{orderSummary}</div>
        <div>
          <h3>Order Summary</h3>
          <p>{`subtotal: ${formatCurrency(subtotal)}`}</p>
          <p>{`discount: -${formatCurrency(discount_total)}`}</p>
          <p>{`shipping: ${formatCurrency(shipping_total)}`}</p>
          <p>{`tax: ${formatCurrency(tax_total)}`}</p>
          <p>{`total: ${formatCurrency(total)}`}</p>
        </div>
        <div>
          <h3>Shipping</h3>
          <p>{`${customer.first_name} ${customer.last_name}`}</p>
          <p>{shipping_address.address_1}</p>
          <p>{`${shipping_address.postal_code}, ${shipping_address.city}`}</p>
          <p>{shipping_address.province}</p>
          <p>{shipping_address.country_code}</p>
        </div>
        <div>
          <h3>Payments</h3>
          <p>{`total paid:${formatCurrency(payments?.[0].amount)}`}</p>
          <p>{`provider:${selectedOrder?.payments?.[0].provider_id}`}</p>
          <p>{payments?.[0].id}</p>
        </div>
      </div>
    </div>
  );
}
