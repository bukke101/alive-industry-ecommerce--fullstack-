import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { CountryContext } from "../../context/CountryContext";
import CountriesList from "../countries/CountriesList";
export default function FooterStoreNav() {
  const {
    countryDisplay,
    handleCountryChange,
    isFooter,
    toggleCountry,
    regions,
    selectCountry,
  } = useContext(CountryContext);
  const { cart } = useContext(CartContext);
  const countries = regions.map((region) => region.countries);

  const toggleFooterCountry = () => {
    if (isFooter) {
      toggleCountry("footer");
    }
  };
  const countryIcon =
    countryDisplay !== "country" ? (
      countryDisplay
    ) : (
      <i className="fa fa-globe" aria-hidden="true" />
    );
  return (
    <div className="store-nav">
      <div>
        <NavLink to="/">
          <i className="fa fa-home" aria-hidden="true" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/products">
          <i className="fa fa-compass" aria-hidden="true" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/cart">
          <i className="fa fa-shopping-basket" />
          {cart && cart.items.length > 0 && <span className="badge">+</span>}
        </NavLink>
      </div>
      <div>
        <NavLink to="/account">
          <i className="fa fa-user" aria-hidden="true" />
        </NavLink>
      </div>
      <div>
        <div onClick={() => toggleCountry("footer")}>
          <div onClick={handleCountryChange} className="country">
            {isFooter ? countryIcon : countryIcon}
          </div>
        </div>
        <ul
          className={`store-county  ${isFooter && "active"}`}
          onMouseLeave={toggleFooterCountry}
        >
          <CountriesList countries={countries} selectCountry={selectCountry} />
        </ul>
      </div>
    </div>
  );
}
