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
        <p className="date">{`order date / ${formattedDate}`}</p>
        <NavLink>
          <li onClick={() => toggleOrder(order)}>{`#${
            order.display_id
          }:  ${formatPrice(order.total, countryData.currencyCode)} - ${
            order.status
          }`}</li>
        </NavLink>
      </div>
    );
  });
  const orderSummary = selectedOrder?.items?.map((item) => (
    <div key={item.id}>
      <img src={item.thumbnail} width="200px" />
      <h3>{`${item.title} - ${item.variant.title} x${item.quantity}`}</h3>
    </div>
  ));

  return (
    <div className="order-wrapper">
      {showOrders && (
        <div className="order-list">
          <h3>All orders</h3>
          {orderList.length > 0 ? (
            orderList
          ) : (
            <p>You have no orders. go to store</p>
          )}
        </div>
      )}
      {selectedOrder && (
        <div className="dashboard-order">
          <div className="dashboard-order-top">
            <h3>{`Order: #${selectedOrder.display_id}`}</h3>
            <p>{`fullfilment: ${selectedOrder.fulfillment_status}`}</p>
            <p>{`payment status: ${selectedOrder.payment_status}`}</p>
            <a onClick={() => setSelectedOrder(null)}>
              <i className="fa fa-times" aria-hidden="true" />
            </a>
          </div>
          <div className="order-summary">
            <div>{orderSummary}</div>
            <div>
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
            </div>
            <div>
              <h3>Shipping</h3>
              <p>{`${selectedOrder?.customer.first_name} ${selectedOrder?.customer.last_name}`}</p>
              <p>{selectedOrder?.shipping_address.address_1}</p>
              <p>{`${selectedOrder?.shipping_address.postal_code}, ${selectedOrder?.shipping_address.city}`}</p>
              <p>{selectedOrder?.shipping_address.province}</p>
              <p>{selectedOrder?.shipping_address.country_code}</p>
            </div>
            <div>
              <h3>Payments</h3>
              <p>{`total paid:${formatPrice(
                selectedOrder?.payments?.[0].amount
              )}`}</p>
              <p>{`provider:${selectedOrder?.payments?.[0].provider_id}`}</p>
              <p>{selectedOrder?.payments?.[0].id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
