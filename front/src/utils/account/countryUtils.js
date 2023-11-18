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
export { addCountryUtil };
