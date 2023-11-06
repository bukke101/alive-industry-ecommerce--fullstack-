import { useContext } from "react";
import BillingForm from "./BillingForm";
import ShippingForm from "./ShippingForm";
import { inputChangeUtil } from "../../utils/checkout/checkoutUtils";
import { CountryContext } from "../../context/CountryContext";
export default function CheckoutForm({
  formData,
  setFormData,
  regions,
  handleFormSubmit,
}) {
  const {
    countryDisplay,
    toggleCheckoutCountry,
    handleCountryChange,
    selectCountry,
    isCheckout,
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
          regions={regions}
          countryDisplay={countryDisplay}
          toggleDropdown={toggleCheckoutCountry}
          isCheckout={isCheckout}
          selectCountry={selectCountry}
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
