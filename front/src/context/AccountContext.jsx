import { createContext, useState, useEffect } from "react";
import {
  initialLoginState,
  initialRegisterState,
  initialUpdateSate,
  initialCheckoutState,
} from "../utils/common/initialState";

export const AccountContext = createContext();
export function AccountProvider({ children }) {
  const [user, setUser] = useState(null);
  const [logInData, setLogInData] = useState({
    isLogIn: true,
    loggedIn: false,
  });
  const [accountData, setAccountData] = useState({
    registerData: initialRegisterState,
    logInData: initialLoginState,
    shippingAddress: initialCheckoutState,
    updateForm: initialUpdateSate,
  });

  useEffect(() => {
    if (logInData.loggedIn) {
      localStorage.setItem("loginState", JSON.stringify(logInData.loggedIn));
    }
  }, [logInData.loggedIn]);

  useEffect(() => {
    const storedLoginData = localStorage.getItem("loginState");
    if (storedLoginData) {
      setLogInData((prevState) => ({
        ...prevState,
        loggedIn: JSON.parse(storedLoginData),
      }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        accountData,
        setAccountData,
        logInData,
        setLogInData,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
