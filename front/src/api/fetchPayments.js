import medusa from "./medusaClient";

const fetchPaymentSessions = async (cartId) => {
  try {
    const { cart: updatedCart } = await medusa.carts.createPaymentSessions(
      cartId
    );
    return updatedCart.payment_sessions;
  } catch (error) {
    console.error("Error fetching payment sessions:", error);
    throw error;
  }
};

export { fetchPaymentSessions };
