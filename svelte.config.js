// import adapter from "@sveltejs/adapter-auto"; // only if we're not hosting on Vercel
import adapter from "@sveltejs/adapter-vercel"; // hosted on Vercel
import preprocess from "svelte-preprocess";
import tailwind from "tailwindcss";
import MagicString from "magic-string";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: "index.html",
			runtime: "nodejs18.x" // runtime environment on hosting platform
		}),
		alias: {
			"$api": "./src/lib/integrations/index",
			"$prismic": "./ext/prismic",
			"$abstracts": "./src/code/css/abstracts",
			"$css": "./src/code/css",
			"$js": "./src/code/js",
			"$ext": "./ext"
		},
		paths: {
			relative: false
		},
		prerender: {
			crawl: true,
			entries: [
				"/",
				"/articles",
				"/styleguide",
				"/moduleguide"
			],
			handleHttpError: "warn"
		}
	},
	preprocess: [
		preprocess({
			postcss: {
				plugins: [
					tailwind
				]
			},
			preserve: ["ld+json"]
		})
	]
};

export default config;
