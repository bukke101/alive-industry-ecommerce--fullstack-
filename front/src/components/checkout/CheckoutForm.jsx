import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";
import { inputChangeUtil } from "../../utils/checkout/checkoutUtils";

export default function CheckoutForm({
  formData,
  setFormData,
  handleFormSubmit,
  countryDisplay,
  toggleCheckoutCountry,
  handleCountryChange,
  isCheckout,
  regions,
  selectCountry,
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
          toggleDropdown={toggleCheckoutCountry}
          isCheckout={isCheckout}
          selectCountry={selectCountry}
          regions={regions}
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
