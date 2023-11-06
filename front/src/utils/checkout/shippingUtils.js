import { addShippingMethod } from "../../api/fetchShippingOptions";
import { fetchPaymentSessions } from "../../api/fetchPayments";
const shippingUtil = async (
  cartId,
  shippingOptionId,
  setShippingData,
  shippingData,
  setPaymentData
) => {
  try {
    await addShippingMethod(cartId, shippingOptionId);
    setShippingData((prevData) => ({
      ...prevData,
      shippingOption: shippingOptionId,
    }));

    const selectedOption = shippingData?.options?.find(
      (option) => option.id === shippingOptionId
    );
    setShippingData((prevData) => ({
      ...prevData,
      selectedShippingOption: selectedOption,
    }));

    const paymentSessions = await fetchPaymentSessions(cartId);

    setPaymentData((prevData) => ({
      ...prevData,
      paymentSessions: paymentSessions,
    }));
  } catch (error) {
    console.error("Error adding shipping and payment method to cart:", error);
  }
};

export { shippingUtil };
