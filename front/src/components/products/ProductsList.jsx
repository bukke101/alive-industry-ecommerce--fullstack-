import { useState } from "react";
import { Link } from "react-router-dom";
import SearchProducts from "../search/SearchProducts";
import { filterUtil, sortUtil } from "../../utils/products/productsUtils";
import { formatPrice } from "../../utils/common/formatPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function ProductsList({ products, currencyCode }) {
  const [sort, setSort] = useState({
    q: "",
    sortBy: "",
  });
  const filterProducts = filterUtil(products, sort);
  const sortProducts = sortUtil(filterProducts, sort);

  const handleSortChange = (e) => {
    setSort((prevState) => ({
      ...prevState,
      sortBy: e.target.value,
    }));
  };

  const allProducts = (productList) => {
    return productList.map((product) => (
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
    ));
  };

  return (
    <>
      <SearchProducts
        setSort={setSort}
        sort={sort}
        handleSortChange={handleSortChange}
      />
      <div className="products-list">
        {sortProducts.length === 0
          ? allProducts(products)
          : allProducts(sortProducts)}
      </div>
    </>
  );
}
