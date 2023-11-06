export default function ProductVariants({
  selectVariant,
  selectedVariant,
  product,
}) {
  const productVariants = product.options.map((option) =>
    option.values.map((value) => {
      const outOfVariant = product.variants.some(
        (variant) =>
          variant.options[0].value === value.value &&
          variant.inventory_quantity === 0
      );
      return (
        <button
          key={value.value}
          onClick={() => selectVariant(value.value)}
          disabled={outOfVariant}
          className={`option-btn ${
            selectedVariant && selectedVariant.options[0].value === value.value
              ? "selected"
              : ""
          } ${outOfVariant ? "disabled" : ""}`}
        >
          {value.value}
          <div className={outOfVariant ? "line-item" : ""}></div>
        </button>
      );
    })
  );
  return <div className="option-btn-wrapper">{productVariants}</div>;
}
