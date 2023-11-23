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
    setShippingData((prevState) => ({
      ...prevState,
      shippingOption: shippingOptionId,
    }));

    const selectedOption = shippingData?.options?.find(
      (option) => option.id === shippingOptionId
    );
    setShippingData((prevState) => ({
      ...prevState,
      selectedShippingOption: selectedOption,
    }));

    const paymentSessions = await fetchPaymentSessions(cartId);

    setPaymentData((prevState) => ({
      ...prevState,
      paymentSessions: paymentSessions,
    }));
  } catch (error) {
    console.error("Error adding shipping and payment method to cart:", error);
  }
};

export { shippingUtil };
