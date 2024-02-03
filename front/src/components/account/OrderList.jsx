import { NavLink } from "react-router-dom";
import { formatPrice } from "../../utils/common/formatPrice";
export default function OrderList({
  results,
  showOrders,
  setSelectedData,
  countryData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) {
  const toggleOrder = (order) => {
    setSelectedData((prevState) => ({
      ...prevState,
      selectedOrder: order,
    }));
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

  const hasMoreOrders = orderList?.length === itemsPerPage;

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    showOrders && (
      <div className="order-list">
        <h3>All orders</h3>
        {orderList?.length > 0 ? (
          <div>
            {orderList}
            <div className="pagination">
              {currentPage > 1 && <button onClick={prevPage}>Prev</button>}
              {hasMoreOrders && <button onClick={nextPage}>Next</button>}
            </div>
          </div>
        ) : (
          <p>You have no orders. Go to store.</p>
        )}
      </div>
    )
  );
}
