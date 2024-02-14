import CountriesList from "../countries/CountriesList";
import { initialCheckoutState } from "../../utils/common/initialState";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function ShippingForm({
  showShipping,
  accountData,
  setAccountData,
  handleShippingAddress,
  regions,
  selectedData,
  setSelectedData,
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
  } = accountData.shippingAddress;

  const countriesOption = regions.map((region) => region.countries);

  const handleShippingInput = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setAccountData((prevState) => ({
      ...prevState,
      shippingAddress: {
        ...prevState.shippingAddress,
        [name]: updatedValue,
      },
    }));
  };
  const handleClearForm = () => {
    setSelectedData((prevState) => ({
      ...prevState,
      selectedAddress: null,
    }));
    setAccountData((prevState) => ({
      ...prevState,
      shippingAddress: initialCheckoutState,
    }));
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
              <Input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={first_name}
                onChange={handleShippingInput}
                className="max-w-sm mb-1"
                required
              />
            </div>
            <div className="form-two-column">
              <Input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={last_name}
                onChange={handleShippingInput}
                className="max-w-sm mb-1"
                required
              />
            </div>
          </div>
          <Input
            type="text"
            id="company"
            name="company"
            placeholder="Company"
            value={company}
            onChange={handleShippingInput}
            className="max-w-sm mb-1"
          />
          <Input
            type="text"
            id="address_1"
            name="address_1"
            placeholder="Address"
            value={address_1}
            onChange={handleShippingInput}
            className="max-w-sm mb-1"
            required
          />
          <Input
            type="text"
            id="address_2"
            name="address_2"
            placeholder="Apartments, Suite, etc."
            value={address_2}
            onChange={handleShippingInput}
            className="max-w-sm mb-1"
          />
          <div className="fullname">
            <div className="form-two-column">
              <Input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={handleShippingInput}
                className="max-w-sm mb-1"
                required
              />
            </div>
            <div className="form-two-column">
              <Input
                type="text"
                id="postal_code"
                name="postal_code"
                placeholder="Postal code"
                value={postal_code}
                onChange={handleShippingInput}
                className="max-w-sm mb-1"
                required
              />
            </div>
          </div>
          <Input
            type="text"
            id="province"
            name="province"
            placeholder="Province"
            value={province}
            onChange={handleShippingInput}
            className="max-w-sm mb-1"
            required
          />
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={handleShippingInput}
            className="max-w-sm mb-1"
          />
          <Button type="submit" size="sm" className="w-full">
            {selectedData?.selectedAddress ? "Edit Address" : "Add Address"}
          </Button>
          {selectedData?.selectedAddress && (
            <Button size="sm" className="w-full" onClick={handleClearForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    )
  );
}
