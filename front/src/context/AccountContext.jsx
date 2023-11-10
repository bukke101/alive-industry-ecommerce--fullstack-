import { createContext, useState } from "react";

export const AccountContext = createContext();
export function AccountProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isLogIn, setIsLogIn] = useState(true);
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
