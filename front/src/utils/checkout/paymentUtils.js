const paymentUtil = async (paymentSessionId, setPaymentData) => {
  try {
    setPaymentData((prevData) => ({
      ...prevData,
      selectedPaymentSession: paymentSessionId,
    }));
  } catch (error) {
    console.error("Error selecting payment session:", error);
  }
};
export { paymentUtil };
