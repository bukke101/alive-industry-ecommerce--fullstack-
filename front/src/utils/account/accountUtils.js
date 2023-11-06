import {
  createCustomer,
  logInUser,
  logOutUser,
} from "../../api/userOperations";
import { removeMessage } from "../common/genralUtils";
import { initialState } from "../checkout/initialCheckoutState";
const registerUtil = async (
  registerData,
  cartId,
  setCart,
  setUser,
  setFormData,
  setRegisterData,
  setAccountMessage
) => {
  try {
    const registeredUser = await createCustomer(registerData, cartId, setCart);
    if (registeredUser) {
      setUser(registeredUser);
      setFormData((prevData) => ({
        ...prevData,
        email: registeredUser?.email,
        first_name: registeredUser?.first_name,
        last_name: registeredUser?.last_name,
      }));
    }
    setRegisterData({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    });
  } catch (error) {
    setAccountMessage("A customer with the given email already exists");
    removeMessage(setAccountMessage);
  }
};

const logInUtil = async (
  logInData,
  cartId,
  setCart,
  setUser,
  setFormData,
  setLogInData,
  setAccountMessage
) => {
  try {
    const loggedInUser = await logInUser(logInData, cartId, setCart);
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData((prevData) => ({
        ...prevData,
        email: loggedInUser?.email,
        first_name: loggedInUser?.first_name,
        last_name: loggedInUser?.last_name,
      }));
    }
    setLogInData({
      email: "",
      password: "",
    });
  } catch (error) {
    setAccountMessage("These credentials do not match our records");
    removeMessage(setAccountMessage);
  }
};

const logOutUtil = async (
  setUser,
  setIsLogIn,
  setFormData,
  setSelectedOrder
) => {
  await logOutUser();
  setUser(null);
  setIsLogIn(true);
  setFormData(initialState);
  setSelectedOrder(null);
};

const inputChangeUtil = (
  name,
  value,
  isLogIn,
  setLogInData,
  setRegisterData
) => {
  isLogIn
    ? setLogInData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    : setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
};
export { registerUtil, logInUtil, logOutUtil, inputChangeUtil };
