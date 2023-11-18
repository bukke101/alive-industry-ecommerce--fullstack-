const formatPrice = (amount, currencyCode) => {
  currencyCode = ["usd", "jpy", "eur", "gbp"].includes(currencyCode)
    ? currencyCode
    : "eur";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(currencyCode === "jpy" ? amount : amount / 100);
};

export { formatPrice };
