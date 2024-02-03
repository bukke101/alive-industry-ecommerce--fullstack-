import { inputUtil, billingUtil, formUtil } from "./formUtils";
import { shippingUtil } from "./shippingUtils";
import { paymentUtil } from "./paymentUtils";
import { completeCart } from "../../api/cartOperations";
import { initialCheckoutState } from "../common/initialState";

const formSubmitUtil = async (
  cartId,
  formData,
  fetchShippingOptions,
  setShippingData,
  selectedRegionId,
  countryData,
  setCountryData,
  setCart,
  setFormData
) => {
  await formUtil(
    cartId,
    formData,
    fetchShippingOptions,
    setShippingData,
    selectedRegionId,
    countryData,
    setCountryData,
    setCart,
    setFormData
  );
};

const inputChangeUtil = async (e, formData, setFormData) => {
  inputUtil(e, formData, setFormData);
};
const billingCountryUtil = async (e, formData, setFormData) => {
  billingUtil(e, formData, setFormData);
};

const checkoutUtil = async (
  cartId,
  setOrderData,
  updateCart,
  setShippingData,
  setPaymentData,
  setUser,
  setLogInData,
  setDiscountData,
  setCountryData,
  setFormData
) => {
  try {
    const { type, data } = await completeCart(cartId);

    if (type === "order") {
      setOrderData({ order: data, orderPlaced: true });
      localStorage.removeItem("cart");
      setUser(null);
      updateCart(null);
      setLogInData((prevState) => ({
        ...prevState,
        isLogIn: true,
      }));
      setShippingData({
        options: [],
        shippingOption: null,
        selectedShippingOption: null,
        isAddress: false,
      });
      setPaymentData({
        paymentSessions: null,
        selectedPaymentSession: null,
        isPaymentOptionSelected: false,
      });
      setDiscountData({
        discountCode: "",
        discountAmount: 0,
        validDiscount: false,
      });
      setCountryData({
        countryId: "",
        currencyCode: "",
        selectedRegionId: "",
      });
      setFormData(initialCheckoutState);
      // need ?? and if decide to leave decide what to do localstorage if not logged out?
      // setLoggedIn(false);
    } else {
      console.error("Error completing cart:", data);
    }
  } catch (error) {
    console.error("Error completing cart in checkoutUtils:", error);
  }
};

const addShippingUtil = async (
  cartId,
  shippingOptionId,
  setShippingData,
  shippingData,
  setPaymentData
) => {
  await shippingUtil(
    cartId,
    shippingOptionId,
    setShippingData,
    shippingData,
    setPaymentData
  );
};

const addPaymentUtil = async (paymentSessionId, setPaymentData) => {
  await paymentUtil(paymentSessionId, setPaymentData);
};

export {
  formSubmitUtil,
  inputChangeUtil,
  billingCountryUtil,
  checkoutUtil,
  addShippingUtil,
  addPaymentUtil,
};
