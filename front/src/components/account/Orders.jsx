import OrderDetails from "./OrderDetails";
import OrderList from "./OrderList";
export default function Orders({
  results,
  showOrders,
  setSelectedOrder,
  countryData,
  selectedOrder,
}) {
  return (
    <div className="order-wrapper">
      <OrderList
        results={results}
        showOrders={showOrders}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        countryData={countryData}
      />
      {selectedOrder && (
        <OrderDetails
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          countryData={countryData}
        />
      )}
    </div>
  );
}
