import {
  createCustomer,
  logInUser,
  logOutUser,
  addShippingAddress,
} from "../../api/accountOperations";
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
  setAccountMessage,
  selectCountry,
  regions
) => {
  try {
    const loggedInUser = await logInUser(logInData, cartId, setCart);
    if (loggedInUser) {
      const countryList = regions?.find((region) =>
        region.countries.some(
          (country) =>
            country.iso_2 === loggedInUser?.shipping_addresses[0]?.country_code
        )
      );

      if (countryList) {
        const selectedCountry = countryList.countries.find(
          (country) =>
            country.iso_2 === loggedInUser?.shipping_addresses[0]?.country_code
        );

        selectCountry(
          loggedInUser?.shipping_addresses[0]?.country_code,
          selectedCountry?.display_name
        );
      }
      setUser(loggedInUser);
      setFormData((prevData) => ({
        ...prevData,
        email: loggedInUser?.email,
        first_name: loggedInUser?.first_name,
        last_name: loggedInUser?.last_name,
        postal_code: loggedInUser?.shipping_addresses[0]?.postal_code,
        province: loggedInUser?.shipping_addresses[0]?.province,
        city: loggedInUser?.shipping_addresses[0]?.city,
        address_1: loggedInUser?.shipping_addresses[0]?.address_1,
        address_2: loggedInUser?.shipping_addresses[0]?.address_2,
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

const addShippingUtil = async (
  shippingAddress,
  setFormData,
  regions,
  selectCountry
) => {
  try {
    const response = await addShippingAddress(shippingAddress);
    if (response.shipping_addresses && response.shipping_addresses.length < 2) {
      const countryList = regions?.find((region) =>
        region.countries.some(
          (country) =>
            country.iso_2 === response?.shipping_addresses[0]?.country_code
        )
      );
      if (countryList) {
        const selectedCountry = countryList.countries.find(
          (country) =>
            country.iso_2 === response?.shipping_addresses[0]?.country_code
        );
        selectCountry(
          response?.shipping_addresses[0]?.country_code,
          selectedCountry?.display_name
        );
      }
      setFormData((prevData) => ({
        ...prevData,
        email: response?.email,
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        postal_code: shippingAddress.postal_code,
        province: shippingAddress.province,
        city: shippingAddress.city,
        address_1: shippingAddress.address_1,
        address_2: shippingAddress.address_2,
      }));
    }
  } catch (error) {
    console.log(error);
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
export {
  registerUtil,
  logInUtil,
  logOutUtil,
  inputChangeUtil,
  addShippingUtil,
};
