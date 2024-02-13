import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerOrders } from "../../api/accountOperations";
import OrderDetails from "./OrderDetails";
import OrderList from "./OrderList";
import Loading from "../loading/Loading";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
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
    customerOrders(itemsPerPage, offset),
  );
  const getData = () => {
    return results?.data?.map((order) => ({
      id: order.display_id,
      date: order.created_at,
      fullfillment: order.fulfillment_status,
      payment_status: order.payment_status,
      total: order.paid_total,
    }));
  };
  const data = getData();

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
        <DataTable columns={columns} data={data} />
        // <OrderDetails
        //   selectedData={selectedData}
        //   setSelectedData={setSelectedData}
        //   countryData={countryData}
        // />
      )}
      {results.isLoading && <Loading />}
      {results.isError && <span>Error fetching orders</span>}
    </div>
  );
}
