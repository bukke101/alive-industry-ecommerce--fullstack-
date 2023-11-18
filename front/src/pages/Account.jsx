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
    registerData,
    isLogIn,
    setIsLogIn,
    logInData,
    setRegisterData,
    setLogInData,
    setUser,
    updateForm,
    setUpdateForm,
    shippingAddress,
    setShippingAddress,
  } = useContext(AccountContext);

  const { setFormData, countryData, selectCountry, regions } =
    useContext(CountryContext);

  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);
  const cartId = cart?.id;

  const [accountMessage, setAccountMessage] = useState("");
  // destructre or move??
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [profile, setProfile] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUtil(
      registerData,
      cartId,
      setCart,
      setUser,
      setFormData,
      setRegisterData,
      setAccountMessage
    );
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    await logInUtil(
      logInData,
      cartId,
      setCart,
      setUser,
      setFormData,
      setLogInData,
      setAccountMessage,
      selectCountry,
      regions
    );
  };
  const handleLogOut = async () => {
    await logOutUtil(
      setUser,
      setIsLogIn,
      setFormData,
      setSelectedOrder,
      setShippingAddress,
      setSelectedAddress
    );
    navigate("/products");
  };
  const handleShippingAddress = async (e) => {
    e.preventDefault();
    if (selectedAddress) {
      await updateAddressUtil(
        selectedAddress,
        shippingAddress,
        setUser,
        setShippingAddress
      );
    } else {
      await addAddressUtil(
        shippingAddress,
        setFormData,
        setUser,
        regions,
        selectCountry,
        setShippingAddress
      );
    }
  };
  const handleUpdateAddress = (address) => {
    updateFormUtil(setSelectedAddress, address, setShippingAddress);
  };
  const handleDeleteAddress = async (addressId) => {
    await deleteAddressUtil(addressId, setUser, setFormData);
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await updateProfileUtil(updateForm, setUser, setUpdateForm);
    setProfile(false);
  };
  return (
    <>
      {!user ? (
        <LoginForm
          logInData={logInData}
          logIn={handleLogIn}
          registerData={registerData}
          isLogIn={isLogIn}
          setIsLogIn={setIsLogIn}
          message={accountMessage}
          handleRegister={handleRegister}
          setRegisterData={setRegisterData}
          setLogInData={setLogInData}
        />
      ) : (
        <Dashboard
          handleLogOut={handleLogOut}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          countryData={countryData}
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          regions={regions}
          handleShippingAddress={handleShippingAddress}
          handleDeleteAddress={handleDeleteAddress}
          handleUpdateAddress={handleUpdateAddress}
          user={user}
          handleUpdateProfile={handleUpdateProfile}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          selectedAddress={selectedAddress}
          profile={profile}
          setProfile={setProfile}
          setSelectedAddress={setSelectedAddress}
        />
      )}
    </>
  );
}
