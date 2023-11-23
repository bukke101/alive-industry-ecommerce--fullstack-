import { Link } from "react-router-dom";
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
        />
        {cartData && cartData.shipping_address && (
          <div>
            <Link>Edit</Link>
            <p>{`${cartData.shipping_address.first_name} ${cartData.shipping_address.last_name}`}</p>
            <p>{cartData.email}</p>
            <p>{cartData.shipping_address.address_1}</p>
            <p>{cartData.shipping_address.address_2}</p>
            <p>{`${cartData.shipping_address.postal_code}, ${cartData.shipping_address.city}`}</p>
            <p>{`${cartData.shipping_address.province}, ${cartData.shipping_address.country_code}`}</p>
          </div>
        )}
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
