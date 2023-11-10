import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerOrders } from "../../api/accountOperations";
import { AccountContext } from "../../context/AccountContext";
import OrderList from "./OrderList";
import ShippingDetails from "./ShippingDetails";
import Loading from "../loading/Loading";

export default function Dashboard({
  handleLogOut,
  showOrders,
  setShowOrders,
  selectedOrder,
  setSelectedOrder,
  countryData,
  showShipping,
  setShowShipping,
  shippingAddress,
  regions,
  handleShippingAddress,
  handleShippingInput,
}) {
  const results = useQuery(["orders"], customerOrders);
  const { user } = useContext(AccountContext);

  const toggleOrders = () => {
    setShowOrders(!showOrders);
    setSelectedOrder(null);
    showShipping ? setShowShipping(!showShipping) : null;
  };
  const toggleShipping = () => {
    setShowShipping(!showShipping);
    setSelectedOrder(null);
    showOrders ? setShowOrders(!showOrders) : null;
  };

  return (
    <div className="dashboard-wrapper">
      {results.isLoading && <Loading />}
      <div className="dashboard-header">
        {!results?.data?.length > 0 ? (
          <>
            <h3>Welcome {user && user?.first_name}</h3>
            <p>{user && user?.email}</p>
          </>
        ) : (
          <>
            <h3>Hi, {results?.data[0]?.customer?.first_name}</h3>
            <p>{results?.data[0]?.email}</p>
          </>
        )}
      </div>
      <div className="dashboard-top-nav">
        <button onClick={toggleOrders}>Orders</button>
        <button onClick={toggleShipping}>Shipping Details</button>
        <button className="logout-btn" onClick={handleLogOut}>
          Log out
        </button>
      </div>
      <OrderList
        results={results}
        showOrders={showOrders}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        countryData={countryData}
      />
      <ShippingDetails
        showShipping={showShipping}
        setShowShipping={setShowShipping}
        shippingAddress={shippingAddress}
        regions={regions}
        handleShippingInput={handleShippingInput}
        handleShippingAddress={handleShippingAddress}
      />
      <div className="dashboard-hero">
        Welcome to your personal page, Where you can view/manage all your
        orders, add/edit a shipping address & personal info. Start Exploring
      </div>
      {results.isError && <span>Error fetching orders</span>}
    </div>
  );
}
