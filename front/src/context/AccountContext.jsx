import { createContext, useState } from "react";
import {
  initialLoginState,
  initialRegisterState,
  initialUpdateSate,
  initialCheckoutState,
} from "../utils/common/initialState";

export const AccountContext = createContext();
export function AccountProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registerData, setRegisterData] = useState(initialRegisterState);

  const [isLogIn, setIsLogIn] = useState(true);
  const [logInData, setLogInData] = useState(initialLoginState);
  const [shippingAddress, setShippingAddress] = useState(initialCheckoutState);
  const [updateForm, setUpdateForm] = useState(initialUpdateSate);

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        registerData,
        setRegisterData,
        isLogIn,
        setIsLogIn,
        logInData,
        setLogInData,
        updateForm,
        setUpdateForm,
        shippingAddress,
        setShippingAddress,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
