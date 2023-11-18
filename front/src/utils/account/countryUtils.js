const addCountryUtil = (user, regions, selectCountry) => {
  const shippingAddress = user?.shipping_addresses?.[0];
  if (shippingAddress && shippingAddress.country_code) {
    const countryList = regions?.find((region) =>
      region.countries?.some(
        (country) => country.iso_2 === shippingAddress.country_code
      )
    );

    if (countryList) {
      const selectedCountry = countryList.countries.find(
        (country) => country.iso_2 === shippingAddress.country_code
      );

      selectCountry(
        shippingAddress?.country_code,
        selectedCountry?.display_name
      );
    }
  }
};

const countryChangeUtil = (
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
export { addCountryUtil, countryChangeUtil };
