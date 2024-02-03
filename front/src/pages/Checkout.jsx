import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { CountryContext } from "../context/CountryContext";
import { AccountContext } from "../context/AccountContext";
import { fetchShippingOptions } from "../api/fetchShippingOptions";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CompletedOrder from "../components/completed/CompletedOrder";
import CartItems from "../components/cart/CartItems";
import {
  formSubmitUtil,
  checkoutUtil,
  addShippingUtil,
  addPaymentUtil,
} from "../utils/checkout/checkoutUtils";

export default function Checkout() {
  const { cart, updateCart, setCart, setDiscountData } =
    useContext(CartContext);
  const { user, setUser, setLogInData } = useContext(AccountContext);
  const cartId = cart?.id;
  const { countryData, setCountryData, formData, setFormData } =
    useContext(CountryContext);
  const currencyCode = countryData?.currencyCode;

  const [shippingData, setShippingData] = useState({
    options: [],
    shippingOption: null,
    selectedShippingOption: null,
    isAddress: false,
  });

  const [orderData, setOrderData] = useState({
    order: null,
    orderPlaced: false,
  });

  const [paymentData, setPaymentData] = useState({
    paymentSessions: null,
    selectedPaymentSession: null,
    isPaymentOptionSelected: false,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await formSubmitUtil(
      cartId,
      formData,
      fetchShippingOptions,
      setShippingData,
      countryData,
      setCountryData,
      setCart,
      setFormData
    );
  };

  const handleShipping = async (cartId, shippingOptionId) => {
    await addShippingUtil(
      cartId,
      shippingOptionId,
      setShippingData,
      shippingData,
      setPaymentData
    );
  };

  const handlePayment = async (paymentSessionId, setPaymentData) => {
    await addPaymentUtil(paymentSessionId, setPaymentData);
  };

  const handleCheckout = async () => {
    await checkoutUtil(
      cartId,
      setOrderData,
      updateCart,
      setShippingData,
      setPaymentData,
      setUser,
      setLogInData,
      setDiscountData,
      setCountryData,
      setFormData
    );
  };

  return (
    <>
      <div className="checkout-page">
        {cart?.items && (
          <CheckoutForm
            handleFormSubmit={handleFormSubmit}
            cartData={cart}
            shippingData={shippingData}
            setShippingData={setShippingData}
            handleShipping={handleShipping}
            cart={cart}
            handlePayment={handlePayment}
            handleCheckout={handleCheckout}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        )}
        {!orderData.orderPlaced && (
          <CartItems
            cartData={cart}
            shippingData={shippingData}
            setShippingData={setShippingData}
            currencyCode={currencyCode}
            user={user}
          />
        )}
      </div>
      <div>
        {orderData.orderPlaced ? (
          <CompletedOrder orderData={orderData} currencyCode={currencyCode} />
        ) : (
          !cart?.items && (
            <Link to="/products">
              You havent added anything to your Cart. Go to Store
            </Link>
          )
        )}
      </div>
    </>
  );
}
