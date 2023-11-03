/* eslint-disable @typescript-eslint/no-unused-vars */
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";

import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }): any => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env", env.NODE_ENV);

  return {
    base: "/",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/assets/css/var.scss';",
        },
      },
    },
    define: {
      "process.env": process.env,
      "process.browser": true,
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
        https: path.resolve(__dirname, "shims.js"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      copyPublicDir: "true",
      sourcemap: false,
      assetsInlineLimit: 4096,
      minify: "terser",
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id: string | string[]) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          chunkFileNames: "js/[hash].js",
        },
        // external: ["buffer"],
      },
      terserOptions: {
        compress: {
          drop_console: command == "build" && mode == "production",
          drop_debugger: true,
        },
        output: {
          comments: true,
        },
      },
    },
    preview: {
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
        output: {
          comments: true,
        },
      },
      host: true,
      port: 8080,
      open: true,
      proxy: {
        "/foo": "http://localhost:4567",
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
    server: {
      host: true,
      port: 1080,
      open: true,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/v2/api": {
          target: "https://www.waltonchain.pro/v2/api/",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/v2\/api/, ""),
        },
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        "^/fallback/.*": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/fallback/, ""),
        },
        "/socket.io": {
          target: "ws://localhost:5174",
          ws: true,
        },
      },
    },
  };
});
