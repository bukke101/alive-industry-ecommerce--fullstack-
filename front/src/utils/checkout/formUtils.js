import { updateCartForm } from "../../api/updateCartData";

const formUtil = async (
  cartId,
  formData,
  fetchShippingOptions,
  setShippingData,
  countryData,
  setCountryData,
  setCart
) => {
  const shippingAddress = {
    company: formData.company,
    first_name: formData.first_name,
    last_name: formData.last_name,
    address_1: formData.address_1,
    address_2: formData.address_2,
    city: formData.city,
    country_code: formData.country_code,
    province: formData.province,
    postal_code: formData.postal_code,
    phone: formData.phone,
  };
  const billingAddress = formData.same_as_shipping
    ? { ...shippingAddress }
    : {
        company: formData.billing_company,
        first_name: formData.billing_first_name,
        last_name: formData.billing_last_name,
        address_1: formData.billing_address_1,
        address_2: formData.billing_address_2,
        city: formData.billing_city,
        country_code: formData.billing_country_code,
        province: formData.billing_province,
        postal_code: formData.billing_postal_code,
        phone: formData.billing_phone,
      };

  const updatedCart = await updateCartForm(
    cartId,
    shippingAddress,
    billingAddress,
    formData,
    countryData
  );
  setCart(updatedCart);
  const fetchedOptions = await fetchShippingOptions(cartId);
  setShippingData((prevData) => ({
    ...prevData,
    options: fetchedOptions,
  }));
  setCountryData((prevData) => ({
    ...prevData,
    selectedRegionId: countryData.selectedRegionId,
  }));
};

const inputUtil = (e, formData, setFormData) => {
  const { name, value, type, checked } = e.target;
  const newState = {
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  };
  setFormData(newState);
};

const billingUtil = (e, formData, setFormData) => {
  const { name, value } = e.target;
  if (!formData.same_as_shipping) {
    setFormData({ ...formData, [name]: value });
  }
};

const countryUtil = (
  countryCode,
  regions,
  setCountryData,
  formData,
  setFormData
) => {
  const selectedRegion = regions?.find((region) =>
    region.countries.some((country) => country.iso_2 === countryCode)
  );
  const currencyCode = selectedRegion?.currency_code;
  if (selectedRegion) {
    const validCountry = selectedRegion.countries.some(
      (country) => country.iso_2 === countryCode
    );
    if (validCountry) {
      setCountryData((prevData) => ({
        ...prevData,
        selectedRegionId: selectedRegion.id,
        currencyCode: currencyCode,
      }));
    } else {
      console.error("Selected country is not valid for the cart region");
    }
  }
  setFormData({ ...formData, country_code: countryCode });
};

export { inputUtil, countryUtil, billingUtil, formUtil };
