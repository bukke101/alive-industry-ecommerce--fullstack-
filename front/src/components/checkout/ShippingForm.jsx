import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

export default function ShippingForm({
  handleInputChange,
  handleCountryChange,
  regions,
  countryDisplay,
  toggleDropdown,
  isCheckout,
  selectCountry,
  formData,
}) {
  const {
    email,
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
  } = formData;
  const countryList = regions.map((region) =>
    region.countries.map((country) => (
      <li
        key={country.id}
        onClick={() => selectCountry(country.iso_2, country.display_name)}
      >
        <ReactCountryFlag
          countryCode={country.iso_2}
          style={{ marginRight: "5px", marginLeft: "5px" }}
          svg
        />
        {country.display_name}
      </li>
    ))
  );
  return (
    <div className="shipping-form">
      <Link to="/cart" className="back-btn">
        &larr; <span>back to cart</span>
      </Link>
      <h3>Shipping Address</h3>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <div className="country-dropdown">
        <div className="selected-country" onClick={toggleDropdown}>
          <div>
            <ReactCountryFlag
              countryCode={country_code}
              style={{ marginRight: "2px", marginLeft: "5px" }}
            />
            {countryDisplay}
          </div>
          <div onClick={handleCountryChange}>
            <i className="fa fa-angle-down"></i>
          </div>
        </div>
        {isCheckout && <ul className="country-list">{countryList}</ul>}
      </div>

      <div className="fullname">
        <div className="form-two-column">
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
        onChange={handleInputChange}
        placeholder="Company"
      />

      <input
        type="text"
        id="address_1"
        name="address_1"
        value={address_1}
        onChange={handleInputChange}
        placeholder="Address"
        required
      />

      <input
        type="text"
        id="address2"
        name="address_2"
        value={address_2}
        onChange={handleInputChange}
        placeholder="Apartments, Suite, etc."
      />
      <div className="fullname">
        <div className="form-two-column">
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
        onChange={handleInputChange}
        placeholder="State / Province"
        required
      />

      <input
        type="tel"
        id="phone"
        name="phone"
        value={phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
    </div>
  );
}
