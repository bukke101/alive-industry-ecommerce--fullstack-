import OrderDetails from "./OrderDetails";
import OrderList from "./OrderList";
export default function Orders({
  results,
  showOrders,
  setSelectedData,
  countryData,
  selectedData,
}) {
  return (
    <div className="order-wrapper">
      <OrderList
        results={results}
        showOrders={showOrders}
        setSelectedData={setSelectedData}
        countryData={countryData}
      />
      {selectedData?.selectedOrder && (
        <OrderDetails
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          countryData={countryData}
        />
      )}
    </div>
  );
}
