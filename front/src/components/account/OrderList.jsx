import { NavLink } from "react-router-dom";
import { formatPrice } from "../../utils/common/formatPrice";
export default function OrderList({
  results,
  showOrders,
  selectedOrder,
  setSelectedOrder,
  countryData,
}) {
  const toggleOrder = (order) => {
    setSelectedOrder(order);
  };
  const orderList = results?.data?.map((order) => {
    const rawDate = order?.created_at;
    const date = new Date(rawDate);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return (
      <div key={order.id}>
        <NavLink>
          <li
            onClick={() => toggleOrder(order)}
          >{`Order #${order.display_id} / ${formattedDate}`}</li>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="order-wrapper">
      {showOrders && (
        <div className="order-list">
          <h4>active</h4>
          {orderList}
          <h4>completed</h4>
        </div>
      )}
      {/* destructure here and move to function */}
      {selectedOrder && (
        <div className="dashboard-order">
          <div className="dashboard-order-top">
            <h3>{`Order: #${selectedOrder.display_id}`}</h3>
            <p>{`fullfilment: ${selectedOrder.fulfillment_status}`}</p>
            <li onClick={() => setSelectedOrder(null)}>close</li>
          </div>

          {selectedOrder.items.map((item) => (
            <div key={item.id}>
              <img src={item.thumbnail} width="150px" />
              <h4>{`${item.title} - ${item.variant.title} x${item.quantity}`}</h4>
            </div>
          ))}
          <h3>Order Summary</h3>

          <p>{`subtotal: ${formatPrice(
            selectedOrder?.subtotal,
            countryData.currencyCode
          )}`}</p>
          <p>{`discount: -${formatPrice(
            selectedOrder?.discount_total,
            countryData.currencyCode
          )}`}</p>
          <p>{`shipping: ${formatPrice(
            selectedOrder?.shipping_total,
            countryData.currencyCode
          )}`}</p>
          <p>{`tax: ${formatPrice(
            selectedOrder?.tax_total,
            countryData.currencyCode
          )}`}</p>
          <p>{`total: ${formatPrice(
            selectedOrder?.total,
            countryData.currencyCode
          )}`}</p>
          <h3>Shipping</h3>
          <p>{`${selectedOrder?.customer.first_name} ${selectedOrder?.customer.last_name}`}</p>
          <p>{selectedOrder?.shipping_address.address_1}</p>
          <p>{`${selectedOrder?.shipping_address.postal_code}, ${selectedOrder?.shipping_address.city}`}</p>
          <p>{selectedOrder?.shipping_address.province}</p>
          <p>{selectedOrder?.shipping_address.country_code}</p>
          <h3>Payments</h3>
          <p>{`total paid:${selectedOrder?.payments?.[0].amount}`}</p>
          <p>{`provider:${selectedOrder?.payments?.[0].provider_id}`}</p>
          <p>{selectedOrder?.payments?.[0].id}</p>
        </div>
      )}
    </div>
  );
}
