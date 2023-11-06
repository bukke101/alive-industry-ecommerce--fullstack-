import medusa from "./medusaClient";

const createCart = async () => {
  try {
    const response = await medusa.carts.create();
    return response.cart;
  } catch (error) {
    console.error("Error creating a new cart:", error);
    throw error;
  }
};

const updateLineItemQuantity = async ({ cartId, lineItemId, quantity }) => {
  try {
    const response = await medusa.carts.lineItems.update(cartId, lineItemId, {
      quantity: quantity,
    });
    return response.cart;
  } catch (error) {
    console.error("Error updating line item quantity:", error);
    throw error;
  }
};

const deleteLineItem = async ({ cartId, lineItemId }) => {
  try {
    const { cart } = await medusa.carts.lineItems.delete(cartId, lineItemId);
    return cart;
  } catch (error) {
    console.error("Error deleting line item:", error);
    throw error;
  }
};

const addToCart = async (cartId, lineItem) => {
  try {
    const response = await medusa.carts.lineItems.create(cartId, lineItem);
    return response.cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

const addDiscount = async (cartId, discountCode) => {
  try {
    const response = await medusa.carts.update(cartId, {
      discounts: [
        {
          code: discountCode,
        },
      ],
    });
    return response.cart;
  } catch (error) {
    console.error("Error applying discount code:", error);
    throw error;
  }
};

const completeCart = async (cartId) => {
  try {
    const { type, data } = await medusa.carts.complete(cartId, {});
    return { type, data };
  } catch (error) {
    console.error("Error completing cart:", error);
    throw error;
  }
};

export {
  updateLineItemQuantity,
  deleteLineItem,
  addToCart,
  completeCart,
  createCart,
  addDiscount,
};
