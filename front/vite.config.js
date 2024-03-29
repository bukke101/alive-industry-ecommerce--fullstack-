import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv(process.env.NODE_ENV, process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.REACT_APP_API_KEY": JSON.stringify(env.REACT_APP_API_KEY),
    "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
  },
});
