import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Nitro auto-detects the Vercel build environment (zero-config) and emits
// a Vercel-compatible output — no explicit preset needed.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    nitro(),
  ],
  server: {
    // Lets the dev server accept requests proxied through an ngrok tunnel.
    allowedHosts: ["nautical-impending-spotter.ngrok-free.dev"],
  },
});
