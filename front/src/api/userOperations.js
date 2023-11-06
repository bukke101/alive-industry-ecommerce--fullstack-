import medusa from "./medusaClient";

const updateCartWithCustomer = async (cartId, customerId, setCart) => {
  try {
    if (cartId && customerId) {
      const updatedCart = await medusa.carts.update(cartId, {
        customer_id: customerId,
      });
      setCart(updatedCart.cart);
    }
  } catch (error) {
    console.error("Error updating cart with customer ID:", error);
    throw error;
  }
};

const createCustomer = async (registerData, cartId, setCart) => {
  try {
    const response = await medusa.customers.create({
      email: registerData.email,
      password: registerData.password,
      first_name: registerData.first_name,
      last_name: registerData.last_name,
    });
    await updateCartWithCustomer(cartId, response.customer.id, setCart);
    return response.customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

const logInUser = async (logInData, cartId, setCart) => {
  try {
    const response = await medusa.auth.authenticate({
      email: logInData.email,
      password: logInData.password,
    });
    await updateCartWithCustomer(cartId, response.customer.id, setCart);
    return response.customer;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const customerOrders = async () => {
  try {
    const response = await medusa.customers.listOrders();
    return response.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const logOutUser = async () => {
  try {
    await medusa.auth.deleteSession();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export { createCustomer, logInUser, logOutUser, customerOrders };
