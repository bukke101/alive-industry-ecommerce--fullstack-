import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { CountryContext } from "../../context/CountryContext";
import ReactCountryFlag from "react-country-flag";
export default function FooterStoreNav() {
  const {
    regions,
    countryDisplay,
    handleCountryChange,
    isFooter,
    toggleFooterCountry,
    selectCountry,
    toggleFooterCountrys,
  } = useContext(CountryContext);
  const { cart } = useContext(CartContext);
  const countryList = regions.map((region) =>
    region.countries.map((country) => (
      <li
        key={country.id}
        onClick={() => selectCountry(country.iso_2, country.display_name)}
      >
        <ReactCountryFlag
          countryCode={country.iso_2}
          style={{ marginRight: "12px", marginLeft: "10px" }}
          svg
        />
        {country.display_name}
      </li>
    ))
  );

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
          onMouseLeave={toggleFooterCountrys}
        >
          {countryList}
        </ul>
      </div>
    </div>
  );
}
