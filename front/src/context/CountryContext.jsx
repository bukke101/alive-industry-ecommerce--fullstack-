import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchRegions from "../api/fetchRegions";
import { countryChangeUtil } from "../utils/checkout/checkoutUtils";
import { initialState } from "../utils/checkout/initialCheckoutState";

export const CountryContext = createContext();
export function CountryProvider({ children }) {
  const results = useQuery(["regions"], fetchRegions);
  const regions = results?.data ?? [];

  const [formData, setFormData] = useState(initialState);
  const [countryDisplay, setCountryDisplay] = useState("country");

  const [countryData, setCountryData] = useState({
    countryId: "",
    currencyCode: "",
    selectedRegionId: "",
  });

  const [isFooter, setIsFooter] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const toggleFooterCountry = () => {
    setIsFooter(!isFooter);
  };
  const toggleFooterCountrys = () => {
    if (isFooter) {
      toggleFooterCountry();
    }
  };
  const toggleCheckoutCountry = () => {
    setIsCheckout(!isCheckout);
  };

  const selectCountry = (countryCode, displayName) => {
    handleCountryChange(countryCode);
    setCountryDisplay(displayName);
    isFooter ? toggleFooterCountry() : "";
    isCheckout ? toggleCheckoutCountry() : "";
  };

  const handleCountryChange = (countryCode) => {
    countryChangeUtil(
      countryCode,
      regions,
      setCountryData,
      formData,
      setFormData
    );
  };

  return (
    <CountryContext.Provider
      value={{
        countryData,
        formData,
        setFormData,
        regions,
        setCountryData,
        countryDisplay,
        setCountryDisplay,
        handleCountryChange,
        isFooter,
        isCheckout,
        toggleFooterCountry,
        toggleCheckoutCountry,
        selectCountry,
        toggleFooterCountrys,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}
