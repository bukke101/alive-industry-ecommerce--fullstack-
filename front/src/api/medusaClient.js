import Medusa from "@medusajs/medusa-js";
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_API_URL;

const medusa = new Medusa({
  baseUrl: "http://localhost:9000",
  maxRetries: 3,
  apiKey: apiKey,
});

export default medusa;
