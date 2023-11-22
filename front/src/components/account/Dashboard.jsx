import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customerOrders } from "../../api/accountOperations";
import Orders from "./Orders";
import Profile from "./Profile";
import Addresses from "./Addresses";
import Loading from "../loading/Loading";

export default function Dashboard({
  handleLogOut,
  selectedData,
  setSelectedData,
  countryData,
  accountData,
  setAccountData,
  handleShippingAddress,
  handleDeleteAddress,
  regions,
  user,
  handleUpdateAddress,
  handleUpdateProfile,
  accountMessage,
}) {
  const results = useQuery(["orders"], customerOrders);
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(section === activeSection ? null : section);
    if (selectedData.selectedOrder)
      setSelectedData((prevState) => ({
        ...prevState,
        selectedOrder: null,
      }));
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

      <Orders
        results={results}
        showOrders={activeSection === "orders"}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        countryData={countryData}
      />
      <Profile
        showProfile={activeSection === "profile"}
        user={user}
        handleUpdateProfile={handleUpdateProfile}
        accountData={accountData}
        setAccountData={setAccountData}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <Addresses
        showShipping={activeSection === "addresses"}
        accountData={accountData}
        setAccountData={setAccountData}
        handleShippingAddress={handleShippingAddress}
        user={user}
        handleDeleteAddress={handleDeleteAddress}
        handleUpdateAddress={handleUpdateAddress}
        regions={regions}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <div className="account-msg-wrapper">
        {accountMessage && <div className="display-msg">{accountMessage}</div>}
      </div>
      <div className="dashboard-hero">
        Welcome to your personal page, Where you can view/manage all your
        orders, add/edit a shipping address & personal info. Start Exploring
      </div>
      {results.isError && <span>Error fetching orders</span>}
    </div>
  );
}
