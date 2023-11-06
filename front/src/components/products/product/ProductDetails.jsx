import { Link } from "react-router-dom";
import ProductVariants from "./ProductVariants";
import { formatPrice } from "../../../utils/common/formatPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

export default function ProductDetails({
  product,
  cart,
  handleAddToCart,
  selectVariant,
  selectedVariant,
  currencyCode,
  message,
}) {
  const productImages = product.images.map((image) => (
    <Link to={image.url} key={image.id}>
      <LazyLoadImage
        alt={image.alt}
        effect="opacity"
        src={image.url}
        data-src={image.url}
      />
    </Link>
  ));

  const outOfStock = product.variants.every(
    (variant) => variant.inventory_quantity === 0
  );

  return (
    <div className="product-detail">
      <div className="product-detail-img-wrapper">
        {product.images ? (
          <LightGallery plugins={[lgZoom]}>{productImages}</LightGallery>
        ) : (
          <div>No image available</div>
        )}
      </div>
      <div className="product-spec-wrapper">
        <div>
          <Link to="/products" relative="path" className="back-btn">
            &larr; <span>back to products</span>
          </Link>
          <h3 className="product-name">{product.title}</h3>
          <span className="price">
            {`Price: ${formatPrice(
              product.variants[0].prices[0].amount,
              currencyCode
            )}`}
          </span>
          <p className="product-description">{product.description}</p>
          <p>select a {product.options[0].title}:</p>
          <ProductVariants
            selectVariant={selectVariant}
            selectedVariant={selectedVariant}
            product={product}
          />
          <button
            disabled={outOfStock}
            className={`cart-add-btn
          ${outOfStock ? "disabled" : ""}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {message && <div className="display-msg">{message}</div>}
          {cart?.items.length > 0 && (
            <div className="view-cart">
              <Link to="/cart">view cart</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
