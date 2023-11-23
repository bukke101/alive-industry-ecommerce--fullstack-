const filterUtil = (products, sort) => {
  return products.filter((product) => {
    const title = product.title.toLowerCase();
    const price = product.variants[0].prices[0].amount.toString();
    const tags = product.tags?.map((tag) => tag.value);
    const searchKey = sort.q.toLowerCase();
    return (
      sort.q.length === 0 ||
      title.includes(searchKey) ||
      price.includes(searchKey) ||
      (tags && tags.some((tag) => tag.toLowerCase().includes(searchKey)))
    );
  });
};
const sortUtil = (productList, sort) => {
  if (sort.sortBy === "lowToHigh") {
    return productList.slice().sort((a, b) => {
      return a.variants[0].prices[0].amount - b.variants[0].prices[0].amount;
    });
  } else if (sort.sortBy === "highToLow") {
    return productList.slice().sort((a, b) => {
      return b.variants[0].prices[0].amount - a.variants[0].prices[0].amount;
    });
  }
  return productList;
};

export { filterUtil, sortUtil };
