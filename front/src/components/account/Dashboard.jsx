import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerOrders } from "../../api/accountOperations";
import Orders from "./Orders";
import Profile from "./Profile";
import Addresses from "./Addresses";
import Loading from "../loading/Loading";

export default function Dashboard({
  handleLogOut,
  selectedOrder,
  setSelectedOrder,
  countryData,
  shippingAddress,
  handleShippingAddress,
  handleDeleteAddress,
  regions,
  user,
  setShippingAddress,
  handleUpdateAddress,
  handleUpdateProfile,
  updateForm,
  setUpdateForm,
  selectedAddress,
  profile,
  setProfile,
  setSelectedAddress,
}) {
  const results = useQuery(["orders"], customerOrders);

  const [activeSection, setActiveSection] = useState(null);
  const [accountMessages, setAccountMessages] = useState("test init");

  const toggleSection = (section) => {
    setActiveSection(section === activeSection ? null : section);
    if (selectedOrder) setSelectedOrder(null);
  };

  return (
    <div className="dashboard-wrapper">
      {results.isLoading && <Loading />}
      <div className="dashboard-header">
        {!results.data?.length > 0 ? (
          <>
            <h3>Welcome {user && user?.first_name}</h3>
            <p>{user && user?.email}</p>
          </>
        ) : (
          <>
            <h3>Hi, {results.data[0]?.customer?.first_name}</h3>
            <p>{results.data[0]?.email}</p>
          </>
        )}
      </div>
      <div className="dashboard-top-nav">
        <button onClick={() => toggleSection("orders")}>Orders</button>
        <button onClick={() => toggleSection("profile")}>Profile</button>
        <button onClick={() => toggleSection("addresses")}>Addresses</button>
        <button className="logout-btn" onClick={handleLogOut}>
          Log out
        </button>
      </div>
      {accountMessages && <div className="display-msg">{accountMessages}</div>}
      <Orders
        results={results}
        showOrders={activeSection === "orders"}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        countryData={countryData}
      />
      <Profile
        showProfile={activeSection === "profile"}
        user={user}
        handleUpdateProfile={handleUpdateProfile}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        profile={profile}
        setProfile={setProfile}
      />
      <Addresses
        showShipping={activeSection === "addresses"}
        shippingAddress={shippingAddress}
        handleShippingAddress={handleShippingAddress}
        user={user}
        handleDeleteAddress={handleDeleteAddress}
        handleUpdateAddress={handleUpdateAddress}
        regions={regions}
        setShippingAddress={setShippingAddress}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <div className="dashboard-hero">
        Welcome to your personal page, Where you can view/manage all your
        orders, add/edit a shipping address & personal info. Start Exploring
      </div>
      {results.isError && <span>Error fetching orders</span>}
    </div>
  );
}
