import medusa from "./medusaClient";

const fetchProducts = async (currencyCode) => {
  try {
    const response = await medusa.products.list({
      currency_code: currencyCode,
    });

    return response.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export default fetchProducts;
