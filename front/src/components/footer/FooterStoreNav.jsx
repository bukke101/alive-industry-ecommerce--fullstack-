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
    toggleFooterCountry,
    toggleFooterCountries,
    regions,
    selectCountry,
  } = useContext(CountryContext);
  const { cart } = useContext(CartContext);
  const countries = regions.map((region) => region.countries);

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
          <div>
            <i className="fa fa-home" aria-hidden="true" />
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/products">
          <div>
            <i className="fa fa-compass" aria-hidden="true" />
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/cart">
          <div>
            {cart && cart.items.length > 0 && <div className="badge">+</div>}
            <i className="fa fa-shopping-basket" />
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/account">
          <div>
            <i className="fa fa-user" aria-hidden="true" />
          </div>
        </NavLink>
      </div>
      <div>
        <div onClick={toggleFooterCountry}>
          <div onClick={handleCountryChange} className="country">
            {isFooter ? countryIcon : countryIcon}
          </div>
        </div>
        <ul
          className={`store-county  ${isFooter && "active"}`}
          onMouseLeave={toggleFooterCountries}
        >
          <CountriesList countries={countries} selectCountry={selectCountry} />
        </ul>
      </div>
    </div>
  );
}
