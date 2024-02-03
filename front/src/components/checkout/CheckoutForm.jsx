import { useContext } from "react";
import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";
import ShippingOptions from "./ShippingOptions";
import DiscountForm from "./DiscountForm";
import PaymentForm from "./PaymentForm";
import { inputChangeUtil } from "../../utils/checkout/checkoutUtils";
import { CountryContext } from "../../context/CountryContext";

export default function CheckoutForm({
  handleFormSubmit,
  cartData,
  shippingData,
  setShippingData,
  handleShipping,
  cart,
  paymentData,
  handlePayment,
  handleCheckout,
  setPaymentData,
}) {
  const {
    regions,
    formData,
    setFormData,
    countryDisplay,
    toggleCountry,
    handleCountryChange,
    isCheckout,
    selectCountry,
    currencyCode,
  } = useContext(CountryContext);

  const handleInputChange = (e) => {
    inputChangeUtil(e, formData, setFormData);
  };

  return (
    <div className="checkout-form">
      <form onSubmit={handleFormSubmit}>
        <ShippingForm
          handleInputChange={handleInputChange}
          handleCountryChange={handleCountryChange}
          formData={formData}
          countryDisplay={countryDisplay}
          toggleDropdown={toggleCountry}
          isCheckout={isCheckout}
          selectCountry={selectCountry}
          regions={regions}
          cartData={cartData}
          shippingData={shippingData}
          setShippingData={setShippingData}
        />
        <BillingForm
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          regions={regions}
        />
        <button type="submit">Continue To Shipping</button>
      </form>
      {shippingData.options?.length > 0 && (
        <ShippingOptions
          shippingData={shippingData}
          handleShipping={handleShipping}
          cart={cart}
          currencyCode={currencyCode}
        />
      )}
      <DiscountForm />
      {shippingData?.shippingOption &&
        paymentData?.paymentSessions?.length > 0 && (
          <PaymentForm
            handlePayment={handlePayment}
            handleCheckout={handleCheckout}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
          />
        )}
    </div>
  );
}
