import medusa from "./medusaClient";

const updateCartForm = async (
  cartId,
  shippingAddress,
  billingAddress,
  formData,
  countryData
) => {
  try {
    const updatedCart = await medusa.carts.update(cartId, {
      email: formData.email,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      region_id: countryData?.selectedRegionId,
    });
    return updatedCart.cart;
  } catch (error) {
    console.error("Error updating shipping address:", error);
    throw error;
  }
};

export { updateCartForm };
