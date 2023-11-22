const paymentUtil = async (paymentSessionId, setPaymentData) => {
  try {
    setPaymentData((prevState) => ({
      ...prevState,
      selectedPaymentSession: paymentSessionId,
    }));
  } catch (error) {
    console.error("Error selecting payment session:", error);
  }
};
export { paymentUtil };
