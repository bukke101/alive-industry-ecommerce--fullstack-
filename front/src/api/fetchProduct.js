import medusa from "./medusaClient";

const fetchProduct = async (id) => {
  try {
    const response = await medusa.products.retrieve(id);
    return response.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export { fetchProduct };
