import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { CountryContext } from "../context/CountryContext";
import fetchProducts from "../api/fetchProducts";
import ProductsList from "../components/products/ProductsList";
import Loading from "../components/loading/Loading";

export default function Products() {
  const { countryData } = useContext(CountryContext);
  const currencyCode = countryData?.currencyCode;

  const results = useQuery(["products", currencyCode], () =>
    fetchProducts(currencyCode)
  );

  const products = results?.data ?? [];

  return (
    <div className="products-page">
      {results.isLoading && <Loading />}
      {products && (
        <ProductsList products={products} currencyCode={currencyCode} />
      )}
      {results.isError && <span>Error fetching products</span>}
    </div>
  );
}
