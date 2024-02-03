import { createContext, useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchRegions from "../api/fetchRegions";
import { countryChangeUtil } from "../utils/account/countryUtils";
import { initialCheckoutState } from "../utils/common/initialState";

export const CountryContext = createContext();
export function CountryProvider({ children }) {
  const results = useQuery(["regions"], fetchRegions);
  const regions = useMemo(() => results?.data ?? [], [results]);

  const [formData, setFormData] = useState(initialCheckoutState);
  const [countryDisplay, setCountryDisplay] = useState("country");

  const [countryData, setCountryData] = useState({
    countryId: "",
    currencyCode: "",
    selectedRegionId: "",
  });
  const [isFooter, setIsFooter] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const toggleCountry = useCallback((type) => {
    if (type === "footer") {
      setIsFooter((prevIsFooter) => !prevIsFooter);
    } else if (type === "checkout") {
      setIsCheckout((prevIsCheckout) => !prevIsCheckout);
    }
  }, []);

  const handleCountryChange = useCallback(
    (countryCode) => {
      countryChangeUtil(
        countryCode,
        regions,
        setCountryData,
        formData,
        setFormData
      );
    },
    [regions, formData, setCountryData, setFormData]
  );

  const selectCountry = useCallback(
    (countryCode, displayName) => {
      handleCountryChange(countryCode);
      setCountryDisplay(displayName);
      isFooter && toggleCountry("footer");
      isCheckout && toggleCountry("checkout");
    },
    [handleCountryChange, isFooter, isCheckout, toggleCountry]
  );

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
        toggleCountry,
        selectCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}
