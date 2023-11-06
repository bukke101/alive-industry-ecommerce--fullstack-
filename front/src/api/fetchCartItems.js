import medusa from "./medusaClient";

const fetchCartItems = async (cartId) => {
  try {
    if (cartId) {
      const { cart } = await medusa.carts.retrieve(cartId);
      return { items: cart.items };
    }
    return null;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export { fetchCartItems };
