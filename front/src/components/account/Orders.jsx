import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerOrders } from "../../api/accountOperations";
import OrderDetails from "./OrderDetails";
import OrderList from "./OrderList";
import Loading from "../loading/Loading";
export default function Orders({
  showOrders,
  setSelectedData,
  countryData,
  selectedData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const offset = (currentPage - 1) * itemsPerPage;
  const results = useQuery(["orders", currentPage], () =>
    customerOrders(itemsPerPage, offset)
  );

  return (
    <div className="order-wrapper">
      <OrderList
        results={results}
        showOrders={showOrders}
        setSelectedData={setSelectedData}
        countryData={countryData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      {selectedData?.selectedOrder && (
        <OrderDetails
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          countryData={countryData}
        />
      )}
      {results.isLoading && <Loading />}
      {results.isError && <span>Error fetching orders</span>}
    </div>
  );
}
