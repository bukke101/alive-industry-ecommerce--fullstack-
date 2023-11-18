import ReactCountryFlag from "react-country-flag";

export default function CountriesList({ countries, selectCountry, asOption }) {
  return (
    <>
      {countries.map((country) =>
        country.map((countryItem) =>
          asOption ? (
            <option key={countryItem.id} value={countryItem.iso_2}>
              {countryItem.display_name}
            </option>
          ) : (
            <li
              key={countryItem.id}
              onClick={() =>
                selectCountry(countryItem.iso_2, countryItem.display_name)
              }
            >
              <ReactCountryFlag
                countryCode={countryItem.iso_2}
                style={{ marginRight: "5px", marginLeft: "5px" }}
                svg
              />
              {countryItem.display_name}
            </li>
          )
        )
      )}
    </>
  );
}
