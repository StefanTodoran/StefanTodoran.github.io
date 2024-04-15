import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    legalComments: "external",
    banner: "/*! For licenses information, see LICENSES.txt */",
  },
});
