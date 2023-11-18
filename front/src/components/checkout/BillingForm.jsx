import CountriesList from "../countries/CountriesList";
import { billingCountryUtil } from "../../utils/checkout/checkoutUtils";
export default function BillingForm({
  formData,
  setFormData,
  handleInputChange,
  regions,
}) {
  const {
    billing_first_name,
    billing_last_name,
    billing_phone,
    billing_postal_code,
    billing_province,
    billing_city,
    billing_address_1,
    billing_address_2,
    billing_company,
    billing_country_code,
  } = formData;
  const handleBillingCountry = (e) => {
    billingCountryUtil(e, formData, setFormData);
  };

  const countriesOption = regions.map((region) => region.countries);

  return (
    <>
      <div className="billing-form">
        <div className="billing-check">
          <input
            type="checkbox"
            id="sameAsShipping"
            name="same_as_shipping"
            checked={formData.same_as_shipping}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="sameAsShipping" className="billing-text">
          Billing same as shipping address
        </label>
      </div>
      {!formData.same_as_shipping && (
        <>
          <div>
            <select
              id="billing_country"
              name="billing_country_code"
              value={billing_country_code}
              onChange={handleBillingCountry}
            >
              <option value="">Country</option>
              <CountriesList countries={countriesOption} asOption />
            </select>
          </div>
          <div className="fullname">
            <div className="form-two-column">
              <input
                type="text"
                id="billing_first_name"
                name="billing_first_name"
                value={billing_first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                required={!formData.same_as_shipping}
              />
            </div>
            <div className="form-two-column">
              <input
                type="text"
                id="billing_last_name"
                name="billing_last_name"
                value={billing_last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                required={!formData.same_as_shipping}
              />
            </div>
          </div>
          <input
            type="text"
            id="billing_company"
            name="billing_company"
            value={billing_company}
            onChange={handleInputChange}
            placeholder="Company"
          />
          <input
            type="text"
            id="billing_address_1"
            name="billing_address_1"
            value={billing_address_1}
            onChange={handleInputChange}
            placeholder="Billing Address"
            required={!formData.same_as_shipping}
          />
          <input
            type="text"
            id="billing_address_2"
            name="billing_address_2"
            value={billing_address_2}
            onChange={handleInputChange}
            placeholder="Apartments, Suite, etc."
          />
          <div className="fullname">
            <div className="form-two-column">
              <input
                type="text"
                id="billing_city"
                name="billing_city"
                value={billing_city}
                onChange={handleInputChange}
                placeholder="City"
                required={!formData.same_as_shipping}
              />
            </div>
            <div className="form-two-column">
              <input
                type="text"
                id="billing_postal_code"
                name="billing_postal_code"
                value={billing_postal_code}
                onChange={handleInputChange}
                placeholder="Postal Code"
                required={!formData.same_as_shipping}
              />
            </div>
          </div>
          <input
            type="text"
            id="billing_province"
            name="billing_province"
            value={billing_province}
            onChange={handleInputChange}
            placeholder="State / Province"
            required={!formData.same_as_shipping}
          />

          <input
            type="tel"
            id="billing_phone"
            name="billing_phone"
            value={billing_phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </>
      )}
    </>
  );
}
