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
  const [isLogIn, setIsLogIn] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountData, setAccountData] = useState({
    registerData: initialRegisterState,
    logInData: initialLoginState,
    shippingAddress: initialCheckoutState,
    updateForm: initialUpdateSate,
  });

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("user", JSON.stringify(loggedIn));
    }
  }, [loggedIn]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedIn(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        isLogIn,
        setIsLogIn,
        accountData,
        setAccountData,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
