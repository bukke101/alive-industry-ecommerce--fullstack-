import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/common/formatPrice";

export default function CompletedOrder({ orderData, currencyCode }) {
  let date = new Date().toLocaleDateString();
  const order = orderData?.order;

  const orderItems =
    order?.orderitems?.length > 1 ? (
      order?.orderitems?.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} />
          <h3>
            {`${item.title} - ${item.variant.title} 
          - x${item.quantity}`}
          </h3>
        </div>
      ))
    ) : (
      <>
        <img src={order?.items[0]?.thumbnail} width="100%" />
        <h3>
          {`${order?.items[0]?.title} - 
        ${order?.items[0]?.variant.title} - 
        x${order?.items[0]?.quantity}`}
        </h3>
      </>
    );

  const orderAddress = (
    <div className="order-address">
      <h3>Delivery</h3>
      <p>
        {order?.shipping_address.first_name}
        {order?.shipping_address.last_name}
      </p>
      <p>
        {order?.shipping_address.address_1}
        {order?.shipping_address.address_2}
      </p>
      <p>{order?.shipping_address.province}</p>
      <p>{order?.shipping_address.city}</p>
      <p>{order?.shipping_address.postal_code}</p>
      <p>{order?.shipping_address.country_code.toUpperCase()}</p>
    </div>
  );

  const orderTotals = (
    <div className="order-totals">
      <p>Subtotal: {formatPrice(order?.subtotal, currencyCode)}</p>
      <p>
        Shipping:
        {formatPrice(order?.shipping_total, currencyCode)}
      </p>
      {order?.discount_total > 0 && (
        <p>Discount: -{formatPrice(order?.discount_total, currencyCode)}</p>
      )}
      <p>Taxes: {formatPrice(order?.tax_total, currencyCode)}</p>
      <p>
        Total Price:
        {formatPrice(order?.paid_total, currencyCode)}
      </p>
    </div>
  );
  return (
    <div className="completed-order">
      <h3>Thank you, your order was successfully placed</h3>
      {order && (
        <div className="order-details">
          <h4>{`Order ID:${order?.display_id} - ${date} `}</h4>
          {order.id}
          {orderItems}
          {orderAddress}
          {orderTotals}
          <div className="back-to-store">
            <Link to="/products">Go to Store</Link>
          </div>
        </div>
      )}
    </div>
  );
}
