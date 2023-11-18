import { useState } from "react";
import { Link } from "react-router-dom";
import SearchProducts from "../search/SearchProducts";
import { formatPrice } from "../../utils/common/formatPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function ProductsList({ products, currencyCode }) {
  const [q, setQ] = useState("");

  const filterProducts = products.filter((product) => {
    const title = product.title.toLowerCase();
    const price = product.variants[0].prices[0].amount.toString();
    const tags = product.tags?.map((tag) => tag.value);
    const searchKey = q.toLowerCase();
    return (
      q.length === 0 ||
      title.includes(searchKey) ||
      price.includes(searchKey) ||
      (tags && tags.some((tag) => tag.toLowerCase().includes(searchKey)))
    );
  });

  const allProducts = (productList) => {
    return (
      productList
        // add sort old-> new
        // .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="products-list-hover">
                <LazyLoadImage
                  alt={product.title}
                  effect="opacity"
                  src={product.thumbnail}
                  className="img"
                />
                <div className="products-hover-text">
                  <div className="products-img-title">View Details</div>
                </div>
                <div className="products-list-cap">
                  <h3>{product.title}</h3>
                  <span className="price">
                    {formatPrice(
                      product.variants[0].prices[0].amount,
                      currencyCode
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))
    );
  };

  return (
    <>
      <SearchProducts setQ={setQ} q={q} />
      <div className="products-list">
        {filterProducts.length === 0
          ? allProducts(products)
          : allProducts(filterProducts)}
      </div>
    </>
  );
}
