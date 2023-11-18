import CountriesList from "../countries/CountriesList";
import { initialCheckoutState } from "../../utils/common/initialState";
export default function ShippingForm({
  showShipping,
  shippingAddress,
  handleShippingAddress,
  regions,
  setShippingAddress,
  selectedAddress,
  setSelectedAddress,
}) {
  const {
    first_name,
    last_name,
    phone,
    postal_code,
    province,
    city,
    country_code,
    address_1,
    address_2,
    company,
  } = shippingAddress;

  const countriesOption = regions.map((region) => region.countries);

  const handleShippingInput = (e) => {
    const { name, value, type, checked } = e.target;
    const newState = {
      ...shippingAddress,
      [name]: type === "checkbox" ? checked : value,
    };
    setShippingAddress(newState);
  };

  const handleClear = () => {
    setSelectedAddress(null);
    setShippingAddress(initialCheckoutState);
  };

  return (
    showShipping && (
      <form onSubmit={handleShippingAddress}>
        <div className="shipping-address">
          <select
            id="country"
            name="country_code"
            value={country_code}
            onChange={handleShippingInput}
          >
            <option value="">Country</option>
            <CountriesList countries={countriesOption} asOption />
          </select>

          <div className="fullname">
            <div className="form-two-column">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={first_name}
                onChange={handleShippingInput}
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-two-column">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={last_name}
                onChange={handleShippingInput}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={handleShippingInput}
            placeholder="Company"
          />
          <input
            type="text"
            id="address_1"
            name="address_1"
            value={address_1}
            onChange={handleShippingInput}
            placeholder="Address"
            required
          />
          <input
            type="text"
            id="address_2"
            name="address_2"
            value={address_2}
            onChange={handleShippingInput}
            placeholder="Apartments, Suite, etc."
          />
          <div className="fullname">
            <div className="form-two-column">
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleShippingInput}
                placeholder="City"
                required
              />
            </div>
            <div className="form-two-column">
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={postal_code}
                onChange={handleShippingInput}
                placeholder="Postal Code"
                required
              />
            </div>
          </div>
          <input
            type="text"
            id="province"
            name="province"
            value={province}
            onChange={handleShippingInput}
            placeholder="State / Province"
            required
          />

          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleShippingInput}
            placeholder="Phone"
          />
          <button type="sumbit">
            {selectedAddress ? "Edit Address" : "Add Address"}
          </button>

          {selectedAddress && (
            <button type="button" onClick={handleClear}>
              cancel
            </button>
          )}
        </div>
      </form>
    )
  );
}
