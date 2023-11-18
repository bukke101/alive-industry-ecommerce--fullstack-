import { inputUtil, countryUtil, billingUtil, formUtil } from "./formUtils";
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
const countryChangeUtil = async (
  countryCode,
  regions,
  setCountryData,
  formData,
  setFormData
) => {
  countryUtil(countryCode, regions, setCountryData, formData, setFormData);
};

const checkoutUtil = async (
  cartId,
  setOrderData,
  updateCart,
  setShippingData,
  setPaymentData,
  setUser,
  setIsLogIn,
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
      setIsLogIn(true);
      setShippingData({
        options: [],
        shippingOption: null,
        selectedShippingOption: null,
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
  countryChangeUtil,
  checkoutUtil,
  addShippingUtil,
  addPaymentUtil,
};
