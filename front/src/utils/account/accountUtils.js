import {
  createCustomer,
  logInUser,
  logOutUser,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  updateProfile,
} from "../../api/accountOperations";
import { addCountryUtil } from "./countryUtils";
import { removeMessage } from "../common/genralUtils";
import {
  initialCheckoutState,
  initialRegisterState,
  initialLoginState,
} from "../common/initialState";
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
        email: registeredUser.email,
        first_name: registeredUser.first_name,
        last_name: registeredUser.last_name,
      }));
    }
    setRegisterData(initialRegisterState);
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
      addCountryUtil(loggedInUser, regions, selectCountry);
      setUser(loggedInUser);
      setFormData((prevData) => ({
        ...prevData,
        email: loggedInUser.email,
        first_name: loggedInUser.first_name,
        last_name: loggedInUser.last_name,
        postal_code: loggedInUser.shipping_addresses[0]?.postal_code,
        province: loggedInUser.shipping_addresses[0]?.province,
        city: loggedInUser.shipping_addresses[0]?.city,
        address_1: loggedInUser.shipping_addresses[0]?.address_1,
        address_2: loggedInUser.shipping_addresses[0]?.address_2,
      }));
    }
    setLogInData(initialLoginState);
  } catch (error) {
    setAccountMessage("These credentials do not match our records");
    removeMessage(setAccountMessage);
  }
};

const addAddressUtil = async (
  shippingAddress,
  setFormData,
  setUser,
  regions,
  selectCountry,
  setShippingAddress
) => {
  try {
    const updatedAddress = await addShippingAddress(shippingAddress);
    if (updatedAddress && updatedAddress.shipping_addresses.length < 2) {
      addCountryUtil(updatedAddress, regions, selectCountry);
      setFormData((prevData) => ({
        ...prevData,
        email: updatedAddress.email,
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        postal_code: shippingAddress.postal_code,
        province: shippingAddress.province,
        city: shippingAddress.city,
        country_code: shippingAddress.country_code,
        address_1: shippingAddress.address_1,
        address_2: shippingAddress.address_2,
      }));
    }
    setUser(updatedAddress);
    setShippingAddress(initialCheckoutState);
  } catch (error) {
    console.log(error);
  }
};

const updateAddressUtil = async (
  selectedAddress,
  shippingAddress,
  setUser,
  setShippingAddress
) => {
  try {
    await updateShippingAddress(
      selectedAddress,
      shippingAddress,
      setUser,
      setShippingAddress
    );
    setShippingAddress(initialCheckoutState);
  } catch (error) {
    error;
  }
};

const updateFormUtil = (setSelectedAddress, address, setShippingAddress) => {
  setSelectedAddress(address);
  setShippingAddress((prevData) => ({
    ...prevData,
    first_name: address.first_name,
    last_name: address.last_name,
    postal_code: address.postal_code,
    province: address.province,
    city: address.city,
    country_code: address.country_code,
    address_1: address.address_1,
    address_2: address.address_2,
  }));
};

const deleteAddressUtil = async (addressId, setUser, setFormData) => {
  try {
    const updatedUser = await deleteShippingAddress(addressId);
    setUser(updatedUser);
    setFormData(initialCheckoutState);
  } catch (error) {
    error;
  }
};

const updateProfileUtil = async (updateForm, setUser, setUpdateForm) => {
  try {
    await updateProfile(updateForm, setUser, setUpdateForm);
  } catch (error) {
    error;
  }
};

const logOutUtil = async (
  setUser,
  setIsLogIn,
  setFormData,
  setSelectedOrder,
  setShippingAddress,
  setSelectedAddress
) => {
  await logOutUser();
  setUser(null);
  setIsLogIn(true);
  setFormData(initialCheckoutState);
  setSelectedOrder(null);
  setShippingAddress(initialCheckoutState), setSelectedAddress(null);
};

const loginInputUtil = (
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
  loginInputUtil,
  addAddressUtil,
  updateAddressUtil,
  deleteAddressUtil,
  updateProfileUtil,
  updateFormUtil,
};
