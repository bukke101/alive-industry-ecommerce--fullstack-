import medusa from "./medusaClient";

const fetchRegions = async () => {
  try {
    const response = await medusa.regions.list();
    return response.regions;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};

export default fetchRegions;
