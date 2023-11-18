import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fetchProduct";
import { CountryContext } from "../context/CountryContext";
import { CartContext } from "../context/CartContext";
import { addToCartUtil } from "../utils/cart/cartUtils";
import ProductDetails from "../components/products/product/ProductDetails";
import Loading from "../components/loading/Loading";

export default function Product() {
  const { id } = useParams();
  const { countryData } = useContext(CountryContext);
  const currencyCode = countryData?.currencyCode;
  const { cart, updateCart } = useContext(CartContext);
  const [productMessage, setProductMessage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");

  const results = useQuery(["products", id], () => fetchProduct(id));
  const product = results?.data;

  const selectVariant = (value) => {
    const variant = product.variants.find((variant) =>
      variant.options.some((option) => option.value === value)
    );
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    await addToCartUtil(
      cart,
      selectedVariant,
      updateCart,
      product,
      setProductMessage,
      setSelectedVariant
    );
  };

  return (
    <div>
      {results.isLoading && <Loading />}
      {results.isError && <span>Error fetching product</span>}
      {product && (
        <ProductDetails
          product={product}
          selectVariant={selectVariant}
          cart={cart}
          handleAddToCart={handleAddToCart}
          selectedVariant={selectedVariant}
          currencyCode={currencyCode}
          message={productMessage}
        />
      )}
    </div>
  );
}
