import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/account/LoginForm";
import Dashboard from "../components/account/Dashboard";
import { AccountContext } from "../context/AccountContext";
import { CartContext } from "../context/CartContext";
import { CountryContext } from "../context/CountryContext";
import {
  registerUtil,
  logInUtil,
  logOutUtil,
  addAddressUtil,
  deleteAddressUtil,
  updateAddressUtil,
  updateProfileUtil,
  updateFormUtil,
} from "../utils/account/accountUtils";
export default function Account() {
  const {
    user,
    setUser,
    accountData,
    setAccountData,
    logInData,
    setLogInData,
  } = useContext(AccountContext);

  const { setFormData, countryData, selectCountry, regions } =
    useContext(CountryContext);
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const cartId = cart?.id;

  const [accountMessage, setAccountMessage] = useState("");
  const [selectedData, setSelectedData] = useState({
    selectedOrder: null,
    selectedAddress: null,
    profile: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUtil(
      accountData,
      setAccountData,
      cartId,
      setCart,
      setUser,
      setFormData,
      setAccountMessage
    );
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    await logInUtil(
      accountData,
      setAccountData,
      cartId,
      setCart,
      setUser,
      setFormData,
      setAccountMessage,
      selectCountry,
      regions,
      setLogInData
    );
  };
  const handleLogOut = async () => {
    await logOutUtil(
      setUser,
      setFormData,
      setSelectedData,
      setAccountData,
      setLogInData
    );
    navigate("/products");
  };
  const handleShippingAddress = async (e) => {
    e.preventDefault();
    if (selectedData?.selectedAddress) {
      await updateAddressUtil(
        selectedData,
        accountData,
        setAccountData,
        setUser,
        setAccountMessage
      );
    } else {
      await addAddressUtil(
        accountData,
        setAccountData,
        setFormData,
        setUser,
        regions,
        selectCountry,
        setAccountMessage
      );
    }
  };
  const handleUpdateAddress = (address) => {
    updateFormUtil(setSelectedData, address, setAccountData);
  };
  const handleDeleteAddress = async (addressId) => {
    await deleteAddressUtil(addressId, setUser, setFormData, setAccountMessage);
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfileUtil(
      accountData,
      setAccountData,
      setUser,
      setAccountMessage,
      setSelectedData
    );
  };
  return (
    <>
      {!logInData.loggedIn ? (
        <LoginForm
          accountData={accountData}
          setAccountData={setAccountData}
          logIn={handleLogIn}
          logInData={logInData}
          setLogInData={setLogInData}
          message={accountMessage}
          handleRegister={handleRegister}
        />
      ) : (
        <Dashboard
          handleLogOut={handleLogOut}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          countryData={countryData}
          accountData={accountData}
          setAccountData={setAccountData}
          regions={regions}
          handleShippingAddress={handleShippingAddress}
          handleDeleteAddress={handleDeleteAddress}
          handleUpdateAddress={handleUpdateAddress}
          user={user}
          handleUpdateProfile={handleUpdateProfile}
          accountMessage={accountMessage}
        />
      )}
    </>
  );
}
