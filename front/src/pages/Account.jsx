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
  const { setFormData, countryData } = useContext(CountryContext);
  const { cart, setCart } = useContext(CartContext);
  const cartId = cart?.id;
  // move to accountprovider? or make in 1 state??
  const [accountMessage, setAccountMessage] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showShipping, setShowShipping] = useState(false);

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
      setAccountMessage
    );
  };
  const handleLogOut = async () => {
    await logOutUtil(setUser, setIsLogIn, setFormData, setSelectedOrder);
  };

  const handleInputChange = (name, value) => {
    inputChangeUtil(name, value, isLogIn, setLogInData, setRegisterData);
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
        />
      )}
    </>
  );
}
