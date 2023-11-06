import medusa from "./medusaClient";

const fetchShippingOptions = async (cartId) => {
  try {
    if (cartId) {
      const { shipping_options } = await medusa.shippingOptions.listCartOptions(
        cartId
      );
      return shipping_options;
    }
    return null;
  } catch (error) {
    console.error("Error fetching shipping options:", error);
    throw error;
  }
};

const addShippingMethod = async (cartId, shippingOptionId) => {
  try {
    await medusa.carts.addShippingMethod(cartId, {
      option_id: shippingOptionId,
    });
  } catch (error) {
    console.error("Error adding shipping method to cart:", error);
    throw error;
  }
};

export { fetchShippingOptions, addShippingMethod };
