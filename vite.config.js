import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwind from "tailwindcss";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			plugins: [tailwind],
			scss: {
				additionalData: `@import "$css/abstracts";`
			}
		}
	},
	server: {
		fs: {
			allow: [".."]
		}
	},
	define: {
		"import.meta.env.VERCEL_ANALYTICS_ID": JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	}
};

export default defineConfig(config);