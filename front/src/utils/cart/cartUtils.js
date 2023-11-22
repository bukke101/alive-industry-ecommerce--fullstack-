import {
  createCart,
  addToCart,
  deleteLineItem,
  updateLineItemQuantity,
  addDiscount,
} from "../../api/cartOperations";
import { removeMessage } from "../common/genralUtils";

const addToCartUtil = async (
  cart,
  selectedVariant,
  updateCart,
  product,
  setProductMessage,
  setSelectedVariant
) => {
  if (!selectedVariant) {
    setProductMessage(
      `Please select a ${product.options[0].title} before adding to cart.`
    );
    removeMessage(setProductMessage);
    return;
  }

  if (selectedVariant.inventory_quantity === 0) {
    setProductMessage("This item is out of stock.");
    removeMessage(setProductMessage);
    return;
  }

  const lineItem = {
    variant_id: selectedVariant.id,
    quantity: 1,
  };

  try {
    const cartId = cart?.id;
    if (cartId) {
      const updatedCart = await addToCart(cartId, lineItem);
      updateCart(updatedCart);
      setSelectedVariant("");
      setProductMessage(`Added to cart successfully!`);
    } else {
      const newCart = await createCart();
      const updatedCart = await addToCart(newCart.id, lineItem);
      updateCart(updatedCart);
      setSelectedVariant("");
      setProductMessage("Added to cart successfully!");
    }
    removeMessage(setProductMessage);
  } catch (error) {
    setProductMessage("Error adding to cart: " + error.message);
  }
};

const deleteUtil = async (
  cartId,
  lineItemId,
  results,
  updateCart,
  setCartMessage
) => {
  const deleted = await deleteLineItem({ cartId, lineItemId });
  results.refetch();
  updateCart(deleted);
  setCartMessage("Item deleted successfully!");
  removeMessage(setCartMessage);
};

const updateQuantityUtil = async (
  cartId,
  lineItemId,
  newQuantity,
  results,
  updateCart,
  setCartMessage
) => {
  newQuantity = parseInt(newQuantity, 10);

  const updatedCart = await updateLineItemQuantity({
    cartId,
    lineItemId,
    quantity: newQuantity,
  });
  results.refetch();
  updateCart(updatedCart);
  setCartMessage("Quantity updated successfully!");
  removeMessage(setCartMessage);
};

const calculateCartUtil = (
  cartData,
  selectedShippingOption,
  percentageDiscount
) => {
  const subtotal = cartData
    ? cartData.items.reduce(
        (total, item) => total + item.unit_price * item.quantity,
        0
      )
    : 0;
  const shipping = selectedShippingOption ? selectedShippingOption?.amount : 0;
  const taxes = cartData?.items[0]?.tax_total;
  const discount = (subtotal * percentageDiscount) / 100;
  const total = subtotal + taxes + shipping - discount;

  return {
    subtotal,
    taxes,
    shipping,
    discount,
    total,
  };
};

const calculateDiscountUtil = (cart) => {
  if (!cart.discounts || cart.discounts.length === 0) {
    return 0;
  }
  const totalDiscount = cart.discounts.reduce(
    (total, discount) => total + discount.rule.value,
    0
  );
  return totalDiscount;
};

const applyDiscountUtil = async (
  cartId,
  discountData,
  setDiscountData,
  setCart,
  setDiscountMessage
) => {
  try {
    const updatedCart = await addDiscount(cartId, discountData.discountCode);
    const totalDiscount = calculateDiscountUtil(updatedCart);
    setDiscountData((prevState) => ({
      ...prevState,
      discountAmount: totalDiscount,
      validDiscount: true,
    }));
    setCart(updatedCart);
    setDiscountMessage("Discount code applied successfully.");
    removeMessage(setDiscountMessage);
  } catch (error) {
    setDiscountData((prevState) => ({
      ...prevState,
      validDiscount: false,
    }));
    setDiscountMessage("Invalid discount code. Please try again.");
    removeMessage(setDiscountMessage);
  }
};

export {
  addToCartUtil,
  deleteUtil,
  updateQuantityUtil,
  calculateCartUtil,
  calculateDiscountUtil,
  applyDiscountUtil,
};
