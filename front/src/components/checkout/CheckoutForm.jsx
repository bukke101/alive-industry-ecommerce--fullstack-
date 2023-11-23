import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";
import { inputChangeUtil } from "../../utils/checkout/checkoutUtils";

export default function CheckoutForm({
  formData,
  setFormData,
  handleFormSubmit,
  countryDisplay,
  toggleCountry,
  handleCountryChange,
  isCheckout,
  regions,
  selectCountry,
  cartData,
  shippingData,
  setShippingData,
}) {
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
    </div>
  );
}
