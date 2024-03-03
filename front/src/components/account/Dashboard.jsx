import { useState } from "react";
import Orders from "./Orders";
import Profile from "./Profile";
import Addresses from "./Addresses";

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
  handleUpdatePassword,
  password,
  setPassword,
}) {
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
      <div className="dashboard-header">
        <h3>Hi, {user && user?.first_name}</h3>
        <p>{user && user?.email}</p>
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
        handleUpdatePassword={handleUpdatePassword}
        password={password}
        setPassword={setPassword}
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
    </div>
  );
}
