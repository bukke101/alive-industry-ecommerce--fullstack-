import { useState, useContext } from "react";
import LoginForm from "../components/account/LoginForm";
import Dashboard from "../components/account/Dashboard";
import { AccountContext } from "../context/AccountContext";
import { CartContext } from "../context/CartContext";
import { CountryContext } from "../context/CountryContext";
import {
  registerUtil,
  logInUtil,
  logOutUtil,
  inputChangeUtil,
  addShippingUtil,
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
  } = useContext(AccountContext);
  const { setFormData, countryData, selectCountry, regions } =
    useContext(CountryContext);
  const { cart, setCart } = useContext(CartContext);
  const cartId = cart?.id;
  const [accountMessage, setAccountMessage] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    company: "",
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    country_code: "",
    province: "",
    postal_code: "",
    phone: "",
  });

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
    await logOutUtil(setUser, setIsLogIn, setFormData, setSelectedOrder);
  };

  const handleInputChange = (name, value) => {
    inputChangeUtil(name, value, isLogIn, setLogInData, setRegisterData);
  };

  const handleShippingInput = (e) => {
    const { name, value, type, checked } = e.target;
    const newState = {
      ...shippingAddress,
      [name]: type === "checkbox" ? checked : value,
    };
    setShippingAddress(newState);
  };

  const handleShippingAddress = async (e) => {
    e.preventDefault();
    await addShippingUtil(shippingAddress, setFormData, regions, selectCountry);
  };
  return (
    <>
      {!user ? (
        <LoginForm
          handleInputChange={handleInputChange}
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
          showOrders={showOrders}
          setShowOrders={setShowOrders}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          countryData={countryData}
          showShipping={showShipping}
          setShowShipping={setShowShipping}
          shippingAddress={shippingAddress}
          regions={regions}
          handleShippingInput={handleShippingInput}
          handleShippingAddress={handleShippingAddress}
        />
      )}
    </>
  );
}
