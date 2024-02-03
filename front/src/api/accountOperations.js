import medusa from "./medusaClient";
import { initialUpdateSate } from "../utils/common/initialState";

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

const createCustomer = async (accountData, cartId, setCart) => {
  const { registerData } = accountData;
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

const logInUser = async (accountData, cartId, setCart) => {
  try {
    const { logInData } = accountData;
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

const customerOrders = async (itemsPerPage, offset) => {
  try {
    const response = await medusa.customers.listOrders({
      limit: itemsPerPage,
      offset: offset,
    });
    return response.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const addShippingAddress = async (accountData) => {
  const { shippingAddress } = accountData;
  try {
    const response = await medusa.customers.addresses.addAddress({
      address: {
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        address_1: shippingAddress.address_1,
        city: shippingAddress.city,
        country_code: shippingAddress.country_code,
        postal_code: shippingAddress.postal_code,
        phone: shippingAddress.phone,
        company: shippingAddress.company,
        address_2: shippingAddress.address_2,
        province: shippingAddress.province,
      },
    });
    return response.customer;
  } catch (error) {
    console.error("Error adding shipping address:", error);
    throw error;
  }
};

const updateShippingAddress = async (selectedData, accountData, setUser) => {
  const addressId = selectedData?.selectedAddress?.id;
  const { shippingAddress } = accountData;
  try {
    const response = await medusa.customers.addresses.updateAddress(addressId, {
      first_name: shippingAddress.first_name,
      last_name: shippingAddress.last_name,
      address_1: shippingAddress.address_1,
      city: shippingAddress.city,
      country_code: shippingAddress.country_code,
      postal_code: shippingAddress.postal_code,
      phone: shippingAddress.phone,
      company: shippingAddress.company,
      address_2: shippingAddress.address_2,
      province: shippingAddress.province,
    });
    setUser(response.customer);
    return response.customer;
  } catch (error) {
    console.error("Error updating shipping address:", error);
    throw error;
  }
};

const deleteShippingAddress = async (addressId) => {
  try {
    const response = await medusa.customers.addresses.deleteAddress(addressId);
    return response.customer;
  } catch (error) {
    console.error("Error deleting shipping address:", error);
    throw error;
  }
};

const updateProfile = async (accountData, setUser, setAccountData) => {
  const { updateForm } = accountData;
  try {
    const response = await medusa.customers.update({
      first_name: updateForm.first_name,
      last_name: updateForm.last_name,
      email: updateForm.email,
    });
    setUser(response.customer);
    setAccountData((prevState) => ({
      ...prevState,
      updateForm: initialUpdateSate,
    }));
    return response.customer;
  } catch (error) {
    console.error("Error updating progile:", error);
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

export {
  createCustomer,
  logInUser,
  logOutUser,
  customerOrders,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  updateProfile,
};
