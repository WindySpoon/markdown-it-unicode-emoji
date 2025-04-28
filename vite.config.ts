import { resolve } from "path";
import project from "./package.json";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      name: project.name,
      fileName: project.name,
    },
  },
  plugins: [
    dts({ rollupTypes: true }),
  ],
});
