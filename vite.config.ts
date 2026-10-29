import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  // 部署到 GitHub Pages 子路径
  base: "/zcode-web/",
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3008
  },
  preview: {
    host: "0.0.0.0",
    port: 3008
  }
});
