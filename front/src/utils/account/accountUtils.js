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
  initialUpdateSate,
} from "../common/initialState";
const registerUtil = async (
  accountData,
  setAccountData,
  cartId,
  setCart,
  setUser,
  setFormData,
  setAccountMessage,
) => {
  try {
    const registeredUser = await createCustomer(accountData, cartId, setCart);
    if (registeredUser) {
      setUser(registeredUser);
      setFormData((prevState) => ({
        ...prevState,
        email: registeredUser.email,
        first_name: registeredUser.first_name,
        last_name: registeredUser.last_name,
      }));
    }
    setAccountData((prevState) => ({
      ...prevState,
      registerData: initialRegisterState,
    }));
  } catch (error) {
    setAccountMessage("A customer with the given email already exists");
    removeMessage(setAccountMessage);
  }
};

const logInUtil = async (
  accountData,
  setAccountData,
  cartId,
  setCart,
  setUser,
  setFormData,
  setAccountMessage,
  selectCountry,
  regions,
  setLogInData,
) => {
  try {
    const loggedInUser = await logInUser(accountData, cartId, setCart);
    if (loggedInUser) {
      addCountryUtil(loggedInUser, regions, selectCountry);
      setUser(loggedInUser);
      setLogInData((prevState) => ({
        ...prevState,
        loggedIn: true,
      }));
      setFormData((prevState) => ({
        ...prevState,
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
    setAccountData((prevState) => ({
      ...prevState,
      logInData: initialLoginState,
    }));
  } catch (error) {
    setAccountMessage("These credentials do not match our records");
    removeMessage(setAccountMessage);
  }
};

const addAddressUtil = async (
  accountData,
  setAccountData,
  setFormData,
  setUser,
  regions,
  selectCountry,
  setAccountMessage,
) => {
  try {
    const updatedAddress = await addShippingAddress(accountData);
    if (updatedAddress && updatedAddress.shipping_addresses.length < 2) {
      const { shippingAddress } = accountData;
      addCountryUtil(updatedAddress, regions, selectCountry);
      setFormData((prevState) => ({
        ...prevState,
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
    setAccountData((prevState) => ({
      ...prevState,
      shippingAddress: initialCheckoutState,
    }));
    setAccountMessage("Address added!");
    removeMessage(setAccountMessage);
  } catch (error) {
    setAccountMessage("Failed to add address");
    removeMessage(setAccountMessage);
  }
};

const updateAddressUtil = async (
  selectedData,
  accountData,
  setAccountData,
  setUser,
  setAccountMessage,
) => {
  try {
    await updateShippingAddress(
      selectedData,
      accountData,
      setAccountData,
      setUser,
    );
    setAccountData((prevState) => ({
      ...prevState,
      shippingAddress: initialCheckoutState,
    }));

    setAccountMessage("Address updated!");
    removeMessage(setAccountMessage);
  } catch (error) {
    setAccountMessage("Failed to update address");
    removeMessage(setAccountMessage);
  }
};

const updateFormUtil = (setSelectedData, address, setAccountData) => {
  setSelectedData((prevState) => ({
    ...prevState,
    selectedAddress: address,
  }));
  setAccountData((prevState) => ({
    ...prevState,
    shippingAddress: {
      ...prevState.shippingAddress,
      first_name: address.first_name,
      last_name: address.last_name,
      postal_code: address.postal_code,
      province: address.province,
      city: address.city,
      country_code: address.country_code,
      address_1: address.address_1,
      address_2: address.address_2,
    },
  }));
};

const deleteAddressUtil = async (
  addressId,
  setUser,
  setFormData,
  setAccountMessage,
) => {
  try {
    const updatedUser = await deleteShippingAddress(addressId);
    setUser(updatedUser);
    setFormData(initialCheckoutState);
    setAccountMessage("Address deleted");
    removeMessage(setAccountMessage);
  } catch (error) {
    setAccountMessage("Failed to delete address");
    removeMessage(setAccountMessage);
  }
};

const updateProfileUtil = async (
  accountData,
  setAccountData,
  setUser,
  setAccountMessage,
  setSelectedData,
) => {
  try {
    await updateProfile(accountData, setUser, setAccountData);
    setAccountMessage("Profile updated!");
    removeMessage(setAccountMessage);
    setSelectedData((prevState) => ({
      ...prevState,
      profile: false,
    }));
  } catch (error) {
    setAccountMessage("Failed to update profile");
    removeMessage(setAccountMessage);
  }
};

const logOutUtil = async (
  setUser,
  setFormData,
  setSelectedData,
  setAccountData,
  setLogInData,
) => {
  await logOutUser();
  setUser(null);
  setLogInData({
    isLogIn: true,
    loggedIn: false,
  });
  setFormData(initialCheckoutState);
  localStorage.removeItem("loginState");
  localStorage.removeItem("user");
  setSelectedData({
    selectedOrder: null,
    selectedAddress: null,
  });
  setAccountData({
    registerData: initialRegisterState,
    logInData: initialLoginState,
    shippingAddress: initialCheckoutState,
    updateForm: initialUpdateSate,
  });
};

const loginInputUtil = (name, value, logInData, setAccountData) => {
  logInData.isLogIn
    ? setAccountData((prevState) => ({
        ...prevState,
        logInData: {
          ...prevState.logInData,
          [name]: value,
        },
      }))
    : setAccountData((prevState) => ({
        ...prevState,
        registerData: {
          ...prevState.registerData,
          [name]: value,
        },
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
